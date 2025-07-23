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
    'unicorn/no-null': 'off',
    'unicorn/prefer-top-level-await': 'off',
    'unicorn/no-array-for-each': 'off',
    'unicorn/prefer-module': 'off',
  },
};
