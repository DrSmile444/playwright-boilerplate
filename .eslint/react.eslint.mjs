import { defineConfig } from 'eslint/config';

import reactEslint from './react/react.eslint.mjs';
import reactOverridesEslint from './react/react-overrides.eslint.mjs';

export default defineConfig([...reactEslint, ...reactOverridesEslint]);
