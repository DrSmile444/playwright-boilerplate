import perfectionist from 'eslint-plugin-perfectionist';

const defaultGroups = [
  'conditional', // (A extends B ? C : D)
  'function', // ((arg: T) => U)
  'import', // import('module').Type
  'intersection', // (A & B)
  'named', // SomeType
  'keyword', // any
  'literal', // 'literal' | 42 | true
  'object', // { a: string; b: number; }
  'operator', // keyof T
  'tuple', // [string, number]
  'union', // (A | B)
  'nullish', // null | undefined
];

const sortGroup = {
  customGroups: {
    index: '^index$',
    path: '^path$',
    element: '^element$',
    key: '^key$',
    className: '^className$',
    classNames: '^classNames$',
    title: '^title$',
    message: '^message$',
    description: '^description$',
  },
  groups: ['index', 'path', 'element', 'key', 'className', 'classNames', 'title', 'message', 'description'],
};

export default [
  perfectionist.configs['recommended-natural'],
  {
    rules: {
      'perfectionist/sort-named-imports': 'off',
      'perfectionist/sort-imports': 'off',
      'perfectionist/sort-interfaces': 'off',
      'perfectionist/sort-jsx-props': [
        'error',
        sortGroup,
        {
          type: 'natural',
        },
      ],
      'perfectionist/sort-modules': 'off',
      'perfectionist/sort-objects': 'off',
      'perfectionist/sort-union-types': [
        'error',
        {
          groups: defaultGroups,
          type: 'natural',
        },
      ],
    },
  },
];
