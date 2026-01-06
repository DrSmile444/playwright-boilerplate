import { defineConfig } from 'eslint/config';

import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss';

export default defineConfig([
  {
    plugins: {
      'better-tailwindcss': eslintPluginBetterTailwindcss,
    },
    rules: {
      // enable all recommended rules to report an error
      ...eslintPluginBetterTailwindcss.configs['recommended-error'].rules,
      'better-tailwindcss/no-unregistered-classes': ['error', { detectComponentClasses: true }],
    },
  },
  {
    settings: {
      'better-tailwindcss': {
        // tailwindcss 4: the path to the entry file of the css based tailwind config (eg: `src/global.css`)
        entryPoint: 'src/index.css',
      },
    },
  },
]);
