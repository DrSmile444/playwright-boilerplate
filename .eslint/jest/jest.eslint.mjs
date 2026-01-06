import { defineConfig } from 'eslint/config';
import pluginJest from 'eslint-plugin-jest';

/**
 * @description ESLint config for Jest test files. Applies recommended Jest rules to files matching *.spec.* and *.test.*.
 * @author Dmytro Vakulenko
 * @see https://github.com/jest-community/eslint-plugin-jest
 */
export default defineConfig([
  {
    name: 'jest',
    files: ['**/*.spec.{js,mjs,cjs,ts}', '**/*.test.{js,mjs,cjs,ts}'],
    ...pluginJest.configs['flat/recommended'],
  },
]);
