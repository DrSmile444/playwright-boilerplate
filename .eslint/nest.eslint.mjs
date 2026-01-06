import { defineConfig } from 'eslint/config';

import nestEslint from './nest/nest.eslint.mjs';
import nestNoProcessEnvironmentEslint from './nest/nest-no-process-env.eslint.mjs';
import nodeEslint from './node.eslint.mjs';

export default defineConfig([
  // Shared Node rules
  ...nodeEslint,
  // NestJS specific rules
  ...nestEslint,
  // NestJS no-process-env rules
  ...nestNoProcessEnvironmentEslint,
]);
