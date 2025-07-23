import path from 'node:path';

import type { Page } from '@playwright/test';
import { test as base } from '@playwright/test';

import { environmentConfig } from '@config/environment.config';

interface ApplicationFixture {
  page: Page;
}

export const test = base.extend<ApplicationFixture>({
  page: async ({ page }, use) => {
    if (environmentConfig.PLAYWRIGHT_RECORD) {
      await page.addInitScript({
        path: path.resolve(__dirname, '../preload/video.preload.js'),
      });
    }

    await use(page);
  },
});

export { expect } from '@playwright/test';
