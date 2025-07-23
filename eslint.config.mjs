import pluginJs from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import { orderedImportsEslint } from './.eslint/ordered-imports.eslint.mjs';
import { playwrightEslint } from './.eslint/playwright.eslint.mjs';
import projectStructureEslint from './.eslint/project-structure.eslint.mjs';
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
  ),
  eslintPluginPrettierRecommended,
  playwrightEslint,
  orderedImportsEslint,
  unicornEslint,
  ...projectStructureEslint,
  ...compat.extends('./.eslint/playwright.eslintrc.json'),
];
