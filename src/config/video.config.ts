import type { PlaywrightTestConfig } from 'playwright/types/test';

export const videoConfig: PlaywrightTestConfig['use'] = {
  launchOptions: {
    slowMo: 300,
  },
  video: 'on',
};
