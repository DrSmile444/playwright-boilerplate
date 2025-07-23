import pluginJs from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import jestEslint from './.eslint/jest.eslint.mjs';
import noSecretsEslint from './.eslint/no-secrets.eslint.mjs';
import { orderedImportsEslint } from './.eslint/ordered-imports.eslint.mjs';
import { playwrightEslint } from './.eslint/playwright.eslint.mjs';
import perfectionistEslint from './.eslint/perfectionist.eslint.mjs';
import projectStructureEslint from './.eslint/project-structure.eslint.mjs';
import securityEslint from './.eslint/security.eslint.mjs';
import sonarEslint from './.eslint/sonar.eslint.mjs';
import { unicornEslint } from './.eslint/unicorn.eslint.mjs';
import { compat } from './eslint-compat.config.mjs';

export default [
  {
    ignores: ['node_modules', 'playwright-report', 'test-results', '.auth'],
  },
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  ...tseslint.configs.strict,
  ...compat.extends(
    './.eslint/node.eslintrc.json',
    './.eslint/custom-style.eslintrc.json5',
    './.eslint/typescript.eslintrc.json',
    './.eslint/typescript-naming-convention.eslintrc.js',
    './.eslint/eslint-rules.eslintrc.json',
  ),
  ...sonarEslint,
  eslintPluginPrettierRecommended,
  playwrightEslint,
  orderedImportsEslint,
  ...noSecretsEslint,
  ...securityEslint,
  ...perfectionistEslint,
  unicornEslint,
  ...projectStructureEslint,
  ...compat.extends('./.eslint/overrides.eslintrc.json'),
  ...compat.extends('./.eslint/playwright.eslintrc.json'),
  ...jestEslint,
];
