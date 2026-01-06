import eslintNestJs from '@darraghor/eslint-plugin-nestjs-typed';

/**
 * @description ESLint config for enforcing best practices and recommended rules for NestJS projects using @darraghor/eslint-plugin-nestjs-typed. Applies recommended NestJS rules and disables specific rules for flexibility in project structure and dependency management.
 * @author Dmytro Vakulenko
 * @see https://github.com/darraghoriordan/eslint-plugin-nestjs-typed
 */
export default [
  {
    files: ['**/*.ts'],
    ...eslintNestJs.configs.flatRecommended[0],
  },
  {
    files: ['**/*.ts'],
    rules: {
      '@darraghor/nestjs-typed/injectable-should-be-provided': 'off',
      '@darraghor/nestjs-typed/api-enum-property-best-practices': 'off',
      'max-classes-per-file': 'off',
      'import/no-extraneous-dependencies': 'off',
    },
  },
  {
    files: ['**/*.module.*'],
    rules: {
      '@typescript-eslint/no-extraneous-class': 'off',
    },
  },
  {
    files: ['**/models/**/*.ts', '**/entities/**/*.ts'],
    rules: {
      '@darraghor/nestjs-typed/param-decorator-name-matches-route-param': 'off',
      '@darraghor/nestjs-typed/controllers-should-supply-api-tags': 'off',
      '@darraghor/nestjs-typed/should-specify-forbid-unknown-values': 'off',
      '@darraghor/nestjs-typed/api-property-matches-property-optionality': 'off',
    },
  },
];
