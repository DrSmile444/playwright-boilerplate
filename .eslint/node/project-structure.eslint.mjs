// @ts-check
import eslint from '@eslint/js';
import { projectStructureParser, projectStructurePlugin } from 'eslint-plugin-project-structure';
import tseslint from 'typescript-eslint';

import { folderStructureConfig } from './project-structure-config.eslint.mjs';

/**
 * @description ESLint config for enforcing folder structure and recommended rules for project files using eslint-plugin-project-structure and typescript-eslint.
 * @author Dmytro Vakulenko
 * @see https://github.com/azat-io/eslint-plugin-project-structure
 */
export default tseslint.config(
  {
    name: 'project-structure-main',
    ignores: ['projectStructure.cache.json'],
  },
  /**
   *  Only for the `project-structure/folder-structure` rule,
   *  which must use the `projectStructureParser` to check all file extensions not supported by ESLint.
   *  If you don't care about validating other file extensions, you can remove this section.
   */
  {
    name: 'project-structure-parser',
    files: [
      // You can expand the list with the file extensions you use.
      '**/*.css',
      '**/*.sass',
      '**/*.less',
      '**/*.svg',
      '**/*.png',
      '**/*.jpg',
      '**/*.ico',
      '**/*.yml',
      '**/*.json',
    ],
    languageOptions: { parser: projectStructureParser },
    plugins: {
      'project-structure': projectStructurePlugin,
    },
    rules: {
      'project-structure/folder-structure': ['error', folderStructureConfig],
    },
  },

  /**
   *  Here you will add your normal rules, which use the default parser.
   *  `tseslint.configs.recommended` and `eslint.configs.recommended.rules` are written in such a way that their rules are not added globally.
   *  Some recommended rules require the default parser and will not work with additional extensions. Therefore,
   *  we want `projectStructureParser` to be used exclusively by the `project-structure/folder-structure` rule.
   *  If you’re not going to use `projectStructureParser`, you can write them normally.
   */
  {
    extends: [...tseslint.configs.recommended],
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      'project-structure': projectStructurePlugin,
    },
    rules: {
      ...eslint.configs.recommended.rules,
      'project-structure/folder-structure': ['error', folderStructureConfig],
    },
  },
);
