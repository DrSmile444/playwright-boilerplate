import playwright from 'eslint-plugin-playwright';

export const playwrightEslint = {
  ...playwright.configs['flat/recommended'],
  files: ['src/**'],
  rules: {
    ...playwright.configs['flat/recommended'].rules,
  },
};
