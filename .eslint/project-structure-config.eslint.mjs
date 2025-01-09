// @ts-check
import { createFolderStructure } from 'eslint-plugin-project-structure';

// Helper function for defining file naming conventions by type
export const getFolderConfig = ({ type }) => `{kebab-case}.${type}.(ts|js|mjs)`;

export const getGenericFolder = ({ type }) => ({
  children: [{ name: getFolderConfig({ type }) }, { name: '{kebab-case}', children: [{ name: '*', ruleId: `${type}Rule` }] }],
});

// Main folder structure configuration
export const folderStructureConfig = createFolderStructure({
  structure: [
    // Root-level files
    { name: '*' },

    // Allow any folders in the root of your project.
    { name: '*', children: [] },

    // .eslint folder for ESLint configurations
    {
      name: '.eslint',
      children: [{ name: getFolderConfig({ type: 'eslint' }) }, { name: '{kebab-case}.eslintrc.(json|js|json5)' }],
    },

    // Source code folder
    {
      name: 'src',
      children: [
        // Apply fixture rule for organized test data files
        { name: 'fixtures', ruleId: 'fixtureRule' },

        // Apply config rule for configuration files
        { name: 'config', ruleId: 'configRule' },

        // Apply decorator rule for custom decorators
        { name: 'decorators', ruleId: 'decoratorsRule' },

        // Apply interface rule for TypeScript interfaces
        { name: 'interfaces', ruleId: 'interfaceRule' },

        // Apply page rule for Page Object Model (POM) files
        { name: 'pages', ruleId: 'pageRule' },

        // Apply page rule for Page Object Model (POM) files
        { name: 'preload', ruleId: 'preloadRule' },

        // Apply test rule for Playwright test cases and setups
        { name: 'tests', ruleId: 'specFolderRule' },

        // Apply utility rule for shared helper files
        { name: 'utils', ruleId: 'utilRule' },

        // Allow any folder in the root of src
        { name: '*', children: [] },
      ],
    },
  ],
  rules: {
    configRule: getGenericFolder({ type: 'config' }),
    decoratorsRule: getGenericFolder({ type: 'decorator' }),
    fixtureRule: getGenericFolder({ type: 'fixture' }),
    interfaceRule: {
      children: [{ name: 'index.ts' }, ...getGenericFolder({ type: 'interface' }).children],
    },
    pageRule: getGenericFolder({ type: 'page' }),
    preloadRule: getGenericFolder({ type: 'preloadRule' }),
    specFoldersRule: {
      name: '{kebab-case}',
      folderRecursionLimit: 3,
      children: [
        { ruleId: 'specFolderRule' },
        { name: getFolderConfig({ type: 'spec' }) },
        { name: getFolderConfig({ type: 'teardown' }) },
      ],
    },
    specFolderRule: {
      name: getFolderConfig({ type: 'spec' }),
      children: [
        { ruleId: 'specFoldersRule' },
        { name: getFolderConfig({ type: 'setup' }) },
        { name: getFolderConfig({ type: 'teardown' }) },
        { name: getFolderConfig({ type: 'spec' }) },
      ],
    },
    utilRule: getGenericFolder({ type: 'util' }),
  },
});
