import * as typedDotenv from 'typed-dotenv';

import type { EnvironmentConfig } from '@interfaces/environment.interface';

const { env, error } = typedDotenv.config();

if (error) {
  console.error('Something wrong with env variables');
  console.error(error);
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit();
}

export const environmentConfig = env as unknown as EnvironmentConfig;
