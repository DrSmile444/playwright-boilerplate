/* eslint-disable sonarjs/slow-regex,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment,no-continue,no-plusplus,no-use-before-define,no-undef,@typescript-eslint/no-require-imports,sonarjs/updated-loop-counter,global-require,@typescript-eslint/no-unsafe-call,unicorn/no-process-exit,sonarjs/no-alphabetical-sort,unicorn/no-array-sort,security/detect-non-literal-fs-filename,security/detect-object-injection,security/detect-unsafe-regex */
import { spawn } from 'node:child_process';
import type { Dirent } from 'node:fs';
import { promises as fs } from 'node:fs';
import { builtinModules } from 'node:module';
import path from 'node:path';

import { resolveTsconfigPaths } from '../.eslint/tsconfig.utils.mjs';

interface CliOptions {
  dir: string;
  dryRun: boolean;
  dev: boolean;
  packageManager?: 'bun' | 'npm' | 'pnpm' | 'yarn';
}

const BUILTIN_SET = new Set([
  ...builtinModules,
  ...builtinModules.map((m) => `node:${m}`).map((m) => (m.startsWith('node:') ? m.slice(5) : m)),
]);

const DEFAULT_INCLUDE_EXT = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs']);

const DEFAULT_EXCLUDE_DIRS = new Set(['node_modules', '.git', 'dist', 'build', '.next', '.turbo', '.output', 'coverage', '.vercel']);

/**
 * Minimal, robust-enough extractor for import specifiers from TS/JS files.
 * Handles:
 *   import x from 'pkg'
 *   import 'pkg'
 *   export * from 'pkg'
 *   export {x} from 'pkg'
 *   const x = require('pkg')
 *   await import('pkg')
 *
 * It ignores relative/absolute paths and filters built-ins later.
 */
function extractModuleSpecifiers(code: string): string[] {
  const specs = new Set<string>();

  // ESM static imports & re-exports
  const importExportRe = /\b(?:import|export)\s+(?:[^'"]*?\sfrom\s*)?['"]([^'"]+)['"]/g;

  for (const m of code.matchAll(importExportRe)) {
    specs.add(m[1]);
  }

  // CommonJS require()
  const requireRe = /\brequire\s*\(\s*['"]([^'"]+)['"]\s*\)/g;

  for (const m of code.matchAll(requireRe)) {
    specs.add(m[1]);
  }

  // Dynamic import()
  const dynImportRe = /\bimport\s*\(\s*['"]([^'"]+)['"]\s*\)/g;

  for (const m of code.matchAll(dynImportRe)) {
    specs.add(m[1]);
  }

  return [...specs];
}

/** Convert 'lodash/map' -> 'lodash', '@types/node/fs' -> '@types/node' */
function toTopLevelPackageName(spec: string): string {
  if (spec.startsWith('@')) {
    const parts = spec.split('/');

    return parts.length >= 2 ? `${parts[0]}/${parts[1]}` : spec;
  }

  return spec.split('/')[0];
}

function isPackageLike(spec: string): boolean {
  return !!spec && !spec.startsWith('.') && !spec.startsWith('/') && !spec.includes(':');
}

async function* walkDirectory(directory: string, includeExtension: Set<string>, excludeDirectories: Set<string>): AsyncGenerator<string> {
  let entries: Dirent[];

  try {
    entries = await fs.readdir(directory, { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    const full = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (!excludeDirectories.has(entry.name)) {
        yield* walkDirectory(full, includeExtension, excludeDirectories);
      }
    } else if (entry.isFile()) {
      const extension = path.extname(entry.name).toLowerCase();

      if (includeExtension.has(extension)) {
        yield full;
      }
    }
  }
}

async function readJson<T = unknown>(filePath: string): Promise<T | null> {
  try {
    const txt = await fs.readFile(filePath, 'utf8');

    return JSON.parse(txt) as T;
  } catch {
    return null;
  }
}

function detectPackageManager(projectDirectory: string, forced?: CliOptions['packageManager']) {
  if (forced) {
    return forced;
  }

  const has = (p: string) => safeExists(path.join(projectDirectory, p));

  // lockfile-based detection
  if (has('pnpm-lock.yaml')) {
    return 'pnpm';
  }

  if (has('yarn.lock')) {
    return 'yarn';
  }

  if (has('bun.lockb')) {
    return 'bun';
  }

  // packageManager field
  try {
    const packageJsonPath = path.join('package.json');

    const packageFile = JSON.parse(fs.readFile(packageJsonPath, 'utf8') as unknown as string);

    const pm: string | undefined = packageFile?.packageManager;

    if (pm?.startsWith('pnpm@')) {
      return 'pnpm';
    }

    if (pm?.startsWith('yarn@')) {
      return 'yarn';
    }

    if (pm?.startsWith('bun@')) {
      return 'bun';
    }

    if (pm?.startsWith('npm@')) {
      return 'npm';
    }
  } catch {
    /* ignore */
  }

  return 'npm'; // default fallback
}

function safeExists(p: string): boolean {
  try {
    // Using sync here is fine: tiny calls and avoids race conditions
    require('node:fs').accessSync(p);

    return true;
  } catch {
    return false;
  }
}

function isInstalledInNodeModules(projectDirectory: string, topLevel: string): boolean {
  // Support scoped packages in node_modules
  const nmPath = path.join(projectDirectory, 'node_modules', topLevel);

  return safeExists(nmPath);
}

// Helper to get tsconfig path aliases
function getTsconfigAliases(tsconfigPath: string): string[] {
  try {
    const pathsObject = resolveTsconfigPaths(tsconfigPath);

    return Object.keys(pathsObject).map((alias) => alias.replace(/\*$/, ''));
  } catch {
    return [];
  }
}

// Helper to process a file and collect referenced packages
async function collectReferencedFromFile(file: string, tsconfigAliases: string[], referenced: Set<string>) {
  const code = await fs.readFile(file, 'utf8');

  for (const spec of extractModuleSpecifiers(code)) {
    if (!isPackageLike(spec)) {
      continue;
    }

    if (tsconfigAliases.some((alias) => spec.startsWith(alias))) {
      continue;
    }

    const bare = spec.startsWith('node:') ? spec.slice(5) : spec;

    if (BUILTIN_SET.has(bare)) {
      continue;
    }

    referenced.add(toTopLevelPackageName(bare));
  }
}

async function findUninstalledDeps(root: string): Promise<{
  referencedTopLevel: Set<string>;
  uninstalled: string[];
}> {
  const referenced = new Set<string>();

  // Get tsconfig path aliases
  const tsconfigPath = path.join(root, '../tsconfig.json');
  const tsconfigAliases = getTsconfigAliases(tsconfigPath);

  for await (const file of walkDirectory(root, DEFAULT_INCLUDE_EXT, DEFAULT_EXCLUDE_DIRS)) {
    await collectReferencedFromFile(file, tsconfigAliases, referenced);
  }

  const uninstalled = [...referenced].filter((packageFile) => !isInstalledInNodeModules(root, packageFile));

  return { referencedTopLevel: referenced, uninstalled };
}

async function installDependencies(
  projectDirectory: string,
  pkgs: string[],
  pm: ReturnType<typeof detectPackageManager>,
  development: boolean,
): Promise<number> {
  if (pkgs.length === 0) {
    return 0;
  }

  const cmds: Record<string, [string, string[]]> = {
    pnpm: development ? ['pnpm', ['add', '-D', ...pkgs]] : ['pnpm', ['add', ...pkgs]],
    yarn: development ? ['yarn', ['add', '--dev', ...pkgs]] : ['yarn', ['add', ...pkgs]],
    npm: development ? ['npm', ['i', '-D', ...pkgs]] : ['npm', ['i', ...pkgs]],
    bun: development ? ['bun', ['add', '-d', ...pkgs]] : ['bun', ['add', ...pkgs]],
  };

  const [cmd, parsedArguments] = cmds[pm] ?? cmds.npm;

  return new Promise<number>((resolve, reject) => {
    const child = spawn(cmd, parsedArguments, { stdio: 'inherit', cwd: projectDirectory, shell: process.platform === 'win32' });

    child.on('close', (code) => resolve(code ?? 1));
    child.on('error', reject);
  });
}

function parseArguments(argv: string[]): CliOptions {
  const out: CliOptions = { dir: '', dryRun: false, dev: false };

  for (let index = 2; index < argv.length; index += 1) {
    const a = argv[index];

    if (a === '--dry-run') {
      out.dryRun = true;
    } else if (a === '--dev' || a === '-D') {
      out.dev = true;
    } else if (a.startsWith('--dir=')) {
      out.dir = a.slice('--dir='.length);
    } else if (a === '--dir' && index + 1 < argv.length) {
      out.dir = argv[++index];
    } else if (a.startsWith('--package-manager=')) {
      out.packageManager = a.slice('--package-manager='.length) as CliOptions['packageManager'];
    } else if (a === '--package-manager' && index + 1 < argv.length) {
      out.packageManager = argv[++index] as CliOptions['packageManager'];
    } else if (a === '-h' || a === '--help') {
      printHelpAndExit();
    } else {
      // ignore unknowns to keep it simple/forwards-compatible
    }
  }

  if (!out.dir) {
    console.error('Error: --dir is required');
    printHelpAndExit(1);
  }

  out.dir = path.resolve(process.cwd(), out.dir);

  return out;
}

function printHelpAndExit(code = 0): never {
  console.info(
    `
Usage:
  tsx tools/find-uninstalled-deps.ts --dir <project> [--dry-run] [--dev|-D] [--package-manager <pnpm|yarn|npm|bun>]

Description:
  Scans the project for imported/required packages that are NOT present in node_modules.
  Prints the list. If not --dry-run, installs them as dependencies (default) or devDependencies (with --dev/-D).

Examples:
  tsx tools/find-uninstalled-deps.ts --dir . --dry-run
  tsx tools/find-uninstalled-deps.ts --dir ./packages/app --dev
  tsx tools/find-uninstalled-deps.ts --dir ./packages/app -D --package-manager pnpm
`.trim(),
  );

  process.exit(code);
}

async function main() {
  const options = parseArguments(process.argv);

  const packageJsonPath = path.join('package.json');

  const packageJson = await readJson<unknown>(packageJsonPath);

  if (!packageJson) {
    console.error(`Error: package.json not found under ${options.dir}`);
    process.exit(1);
  }

  console.info(`🔎 Scanning: ${options.dir}`);
  const { uninstalled, referencedTopLevel } = await findUninstalledDeps(options.dir);

  const pm = detectPackageManager(options.dir, options.packageManager);

  console.info(`📦 Package manager: ${pm}`);

  // Optional: give visibility into what's referenced
  console.info(`📚 Referenced packages (top-level): ${referencedTopLevel.size}`);

  if (referencedTopLevel.size > 0) {
    console.info([...referencedTopLevel].sort().join(', '));
  }

  if (uninstalled.length === 0) {
    console.info('✅ No uninstalled dependencies detected.');

    return;
  }

  console.info('\n🚩 Uninstalled dependencies:');

  for (const d of uninstalled) {
    console.info('  -', d);
  }

  if (options.dryRun) {
    console.info('\nℹ️  Dry-run enabled; skipping installation.');

    return;
  }

  const installType = options.dev ? 'devDependencies' : 'dependencies';

  console.info(`\n🧰 Installing as ${installType}...`);
  const code = await installDependencies(options.dir, uninstalled, pm, options.dev);

  if (code === 0) {
    console.info(`✅ Installed missing packages as ${installType}.`);
  } else {
    console.error(`❌ Installer exited with code ${code}`);
    process.exit(code);
  }
}

main().catch((error) => {
  console.error('Unexpected error:', error);
  process.exit(1);
});
