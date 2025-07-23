import simpleImportSort from 'eslint-plugin-simple-import-sort';

export const orderedImportsEslint = {
  plugins: {
    'simple-import-sort': simpleImportSort,
  },
  rules: {
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Packages `node` related packages come first.
          ['^node'],
          // Playwright packages.
          ['^@playwright'],
          // All other npm packages.
          ['^@?\\w'],
          // Internal packages (split by alias).
          ['^@config(/.*|$)?'],
          ['^@decorators(/.*|$)?'],
          ['^@fixtures(/.*|$)?'],
          ['^@interfaces(/.*|$)?'],
          ['^@models(/.*|$)?'],
          ['^@pages(/.*|$)?'],
          ['^@test-data(/.*|$)?'],
          ['^@tests(/.*|$)?'],
          ['^@utils(/.*|$)?'],
          // Side effect imports.
          ['^\\u0000'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports.
          ['^.+\\.?(css)$'],
        ],
      },
    ],
  },
};
