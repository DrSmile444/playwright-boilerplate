import { defineConfig } from 'eslint/config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

import 'eslint-config-prettier';

export default defineConfig([
  eslintPluginPrettierRecommended,
  // Disable prettier for SVG files
  {
    name: 'Disable prettier for SVG files',
    files: ['**/*.svg'],
    rules: {
      'prettier/prettier': 'off',
    },
  },
]);
