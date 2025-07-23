import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';

export const unicornEslint = {
  languageOptions: {
    globals: globals.builtin,
  },
  plugins: {
    unicorn: eslintPluginUnicorn,
  },
  rules: {
    'unicorn/no-array-for-each': 'off',
    'unicorn/no-null': 'off',
    'unicorn/prefer-module': 'off',
    'unicorn/prefer-top-level-await': 'off',
  },
};
