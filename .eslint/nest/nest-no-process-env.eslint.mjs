import { defineConfig } from 'eslint/config';

/**
 * @description ESLint config for enforcing no usage of process.env except in whitelisted files. Applies 'no-process-env' rule globally and disables it for specific files where environment access is required (e.g., config, main entrypoint, ESLint config itself).
 * @author Dmytro Vakulenko
 * @see https://eslint.org/docs/latest/rules/no-process-env
 * @type {import('eslint').Linter.FlatConfig[]}
 */
export default defineConfig([
  {
    // This configuration object applies to all files by default if no 'files' key is present
    rules: {
      'no-process-env': 'error',
    },
  },
  {
    // This object targets test files where process.env usage IS warned in spec files
    files: ['**/*.spec.ts', '**/*.test.ts'],
    rules: {
      'no-process-env': 'warn', // Warn instead of error in test files
    },
  },
  {
    // This object targets files where process.env usage IS allowed
    files: [
      'src/config/**/*.ts', // e.g., src/config/configuration.ts
      'src/main.ts', // main bootstrapping file
      'eslint.config.js', // The main config file itself
      'scripts/**/*', // e.g., build or setup scripts
      'database/**/*', // e.g., build or setup scripts
    ],
    rules: {
      'no-process-env': 'off', // Disable the rule for these specific files
    },
  },
]);
