import pluginJest from 'eslint-plugin-jest';

export default [
  {
    files: ['**/*.spec.{js,mjs,cjs,ts}', '**/*.test.{js,mjs,cjs,ts}'],
    ...pluginJest.configs['flat/recommended'],
  },
];
