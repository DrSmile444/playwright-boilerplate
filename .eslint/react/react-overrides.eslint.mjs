import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.css'],
    rules: {
      'unicorn/filename-case': 'off',
      'project-structure/folder-structure': 'off',
    },
  },
  {
    files: ['**/*.jsx', '**/*.tsx'],
    rules: {
      'unicorn/filename-case': 'off',
      'project-structure/folder-structure': 'off',
      'import/no-absolute-path': 'off',
    },
  },
]);
