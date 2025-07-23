/* eslint-disable sonarjs/slow-regex */
import type { PlaywrightTestConfig } from '@playwright/test';
import { defineConfig, devices } from '@playwright/test';

import { environmentConfig } from '@config/environment.config';
import { videoConfig } from '@config/video.config';

import type { PlaywrightExtraConfig } from '@interfaces';

/* Define the local configuration for the test runner */
const localConfig: PlaywrightTestConfig<PlaywrightExtraConfig> = {
  use: {
    /* API URL to use in `apiRequest`. */
    apiUrl: environmentConfig.LOCAL_API_BASE_URL,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: environmentConfig.LOCAL_BASE_URL,
  },
};

/* Define the development configuration for the test runner */
const developmentConfig: PlaywrightTestConfig<PlaywrightExtraConfig> = {
  use: {
    /* API URL to use in `apiRequest`. */
    apiUrl: environmentConfig.DEV_API_BASE_URL,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: environmentConfig.DEV_BASE_URL,
  },
};

/* Define the production configuration for the test runner */
const productionConfig: PlaywrightTestConfig<PlaywrightExtraConfig> = {
  use: {
    /* API URL to use in `apiRequest`. */
    apiUrl: environmentConfig.PROD_API_BASE_URL,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: environmentConfig.PROD_BASE_URL,
  },
};

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<PlaywrightExtraConfig>({
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: environmentConfig.CI,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Configure projects for major browsers */
  projects: [
    { name: 'setup', testMatch: /.*\.setup\.ts/ },
    { name: 'teardown', testMatch: /.*\.teardown\.ts/ },
    {
      name: 'teardown-prod',
      testMatch: /.*\.teardown\.ts/,
      use: { ...productionConfig.use },
    },

    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'chromium-dev',
      use: { ...devices['Desktop Chrome'], ...developmentConfig.use },
    },

    {
      name: 'chromium-prod',
      use: { ...devices['Desktop Chrome'], ...productionConfig.use },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Retry on CI only */
  retries: environmentConfig.CI ? 2 : 0,
  testDir: './src/tests',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    ...localConfig.use,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    ...(environmentConfig.PLAYWRIGHT_RECORD ? videoConfig : {}),
  },

  /* Opt out of parallel tests on CI. */
  workers: environmentConfig.CI ? 1 : undefined,

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !environmentConfig.CI,
  // },
});
