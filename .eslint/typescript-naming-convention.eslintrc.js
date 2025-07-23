/* eslint-disable unicorn/prefer-string-raw */
/**
 * @author Dmytro Vakulenko
 * @description Best practices for naming in JS / TS
 * @version 1.1
 * */
module.exports = {
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/naming-convention': [
          'error',
          {
            format: ['camelCase', 'snake_case', 'PascalCase'],
            selector: 'objectLiteralProperty',
          },
          {
            format: ['PascalCase', 'UPPER_CASE'],
            leadingUnderscore: 'allow',
            modifiers: ['public', 'static'],
            selector: 'memberLike',
          },
          {
            format: ['PascalCase', 'UPPER_CASE'],
            leadingUnderscore: 'forbid',
            modifiers: ['private', 'static'],
            selector: 'memberLike',
          },
          {
            format: ['camelCase', 'snake_case'],
            leadingUnderscore: 'allow',
            modifiers: ['public'],
            selector: 'memberLike',
          },
          {
            format: ['camelCase'],
            leadingUnderscore: 'forbid',
            modifiers: ['private'],
            selector: 'memberLike',
          },
          {
            format: ['UPPER_CASE'],
            leadingUnderscore: 'forbid',
            modifiers: ['private', 'readonly'],
            selector: 'memberLike',
          },
          {
            format: ['camelCase'],
            leadingUnderscore: 'require',
            modifiers: ['protected'],
            selector: 'memberLike',
          },
          {
            format: ['camelCase', 'snake_case'],
            leadingUnderscore: 'allow',
            selector: 'parameter',
          },
          {
            format: ['UPPER_CASE'],
            selector: 'enumMember',
          },
          {
            custom: {
              match: false,
              regex: '^[IT][A-Z]',
            },
            format: ['PascalCase'],
            selector: 'interface',
          },
          {
            format: ['PascalCase'],
            selector: 'class',
          },
          {
            custom: {
              match: false,
              regex: '(^[IT][A-Z])|(.*es$)|(.*[^u]s$)',
            },
            format: ['PascalCase'],
            selector: 'enum',
          },
          {
            custom: {
              match: false,
              regex: '^[IT][A-Z]',
            },
            format: ['PascalCase'],
            selector: 'typeLike',
          },
          {
            format: ['camelCase', 'UPPER_CASE'],
            selector: 'variable',
          },
          {
            format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
            leadingUnderscore: 'allow',
            modifiers: ['const', 'global'],
            selector: 'variable',
          },
          {
            format: ['PascalCase', 'camelCase', 'snake_case'],
            leadingUnderscore: 'allow',
            modifiers: ['destructured'],
            selector: 'variable',
          },
          {
            format: ['PascalCase'],
            prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
            selector: 'variable',
            types: ['boolean'],
          },
          // Allow destructed without prefixes
          // Suitable for lib props
          {
            format: null,
            modifiers: ['destructured'],
            selector: 'variable',
            types: ['boolean'],
          },
          // Allow `EditActionComponent`
          {
            filter: {
              match: true,
              regex: '^\\w*Component$',
            },
            format: ['PascalCase'],
            selector: 'variable',
          },
          {
            format: ['camelCase', 'snake_case'],
            leadingUnderscore: 'allow',
            modifiers: ['destructured'],
            selector: 'parameter',
          },
          {
            format: ['PascalCase', 'camelCase'],
            leadingUnderscore: 'allow',
            selector: 'function',
          },
          {
            format: ['PascalCase', 'camelCase'],
            leadingUnderscore: 'allow',
            modifiers: ['exported', 'global'],
            selector: 'function',
          },
          {
            format: null,
            modifiers: ['requiresQuotes'],
            selector: [
              'classProperty',
              'objectLiteralProperty',
              'typeProperty',
              'classMethod',
              'objectLiteralMethod',
              'typeMethod',
              'accessor',
              'enumMember',
            ],
          },
          {
            format: ['camelCase'],
            selector: 'function',
          },
        ],
      },
    },
  ],
};
