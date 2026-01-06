import { defineConfig } from 'eslint/config';

import nodeConfigs from './.eslint/node.eslint.mjs';
import { playwrightEslint } from './.eslint/playwright.eslint.mjs';
import vitestEslint from './.eslint/vitest.eslint.mjs';

export default defineConfig([
  // Apply this config to js and ts files only
  {
    name: 'Source Files to scan',
    files: ['**/*.{js,mjs,cjs,ts}'],
  },
  {
    ignores: ['node_modules', 'playwright-report', 'test-results', '.auth'],
  },
  // Node config
  ...nodeConfigs,
  // Playwright plugin
  playwrightEslint,
  // Vitest rules for testing
  ...vitestEslint,
]);
