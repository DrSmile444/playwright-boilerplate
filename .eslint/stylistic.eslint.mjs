import stylistic from '@stylistic/eslint-plugin';

export default [
  {
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      '@stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'always', next: 'return', prev: '*' },
        { blankLine: 'always', next: '*', prev: ['const', 'let', 'var'] },
        { blankLine: 'any', next: ['const', 'let', 'var'], prev: ['const', 'let', 'var'] },
        { blankLine: 'always', next: '*', prev: 'directive' },
        { blankLine: 'any', next: 'directive', prev: 'directive' },
        { blankLine: 'always', next: '*', prev: ['case', 'default'] },
        {
          blankLine: 'always',
          next: '*',
          prev: 'multiline-block-like',
        },
        {
          blankLine: 'always',
          next: 'if',
          prev: ['if', 'const', 'let', 'var'],
        },
        {
          blankLine: 'always',
          next: ['const', 'let', 'var'],
          prev: ['if'],
        },
        {
          blankLine: 'always',
          next: '*',
          prev: ['import'],
        },
        {
          blankLine: 'any',
          next: 'import',
          prev: 'import',
        },
        {
          blankLine: 'always',
          next: ['export', 'class', 'default', 'function'],
          prev: ['export', 'class', 'default', 'function'],
        },
        {
          blankLine: 'always',
          next: ['multiline-const', 'multiline-let', 'multiline-expression'],
          prev: '*',
        },
        {
          blankLine: 'always',
          next: '*',
          prev: ['multiline-const', 'multiline-let', 'multiline-expression'],
        },
        { blankLine: 'always', next: 'block', prev: '*' },
        { blankLine: 'always', next: '*', prev: 'block' },
        { blankLine: 'always', next: 'block-like', prev: '*' },
        { blankLine: 'always', next: '*', prev: 'block-like' },
        { blankLine: 'always', next: 'return', prev: '*' },
      ],
    },
  },
];
