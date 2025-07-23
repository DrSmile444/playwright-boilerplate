import sonarjs from 'eslint-plugin-sonarjs';

// eslint-plugin-sonarjs is an ESLint plugin maintained by Sonar,
// designed to help developers write Clean Code.
// This plugin exposes to ESLint users all original JS/TS rules from SonarJS,
// an analyzer for JavaScript and TypeScript within the Sonar ecosystem.
// This plugin offers general-purpose rules for detecting code smells and bugs,
// as well as rules for other aspects of code quality,
// including testing, accessibility, and more.
// Additionally, it enhances code security by providing rules to report
// potential security vulnerabilities.
export default [
  sonarjs.configs.recommended,
  {
    rules: {
      'sonarjs/function-return-type': 'warn',
      'sonarjs/no-commented-code': 'warn',
      'sonarjs/no-selector-parameter': 'off',
      'sonarjs/redundant-type-aliases': 'off',
      'sonarjs/todo-tag': 'warn',
    },
  },
];
