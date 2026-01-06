import { defineConfig } from 'eslint/config';

import betterTailwindcssEslint from './tailwindcss/better-tailwindcss.eslint.mjs';

export default defineConfig([...betterTailwindcssEslint]);
