# Playwright Boilerplate ✨

## Introduction

This is a Playwright boilerplate project designed to streamline end-to-end testing using modern TypeScript practices. It includes robust configurations, reusable decorators, and interfaces to ensure scalability and maintainability. The project is modular, making it easy to integrate into existing workflows or use as a standalone testing solution.

---

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Configuration](#configuration)
- [Examples](#examples)
- [Dependencies](#dependencies)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Playwright Integration**: Seamless integration with Playwright for browser automation.
- **TypeScript Support**: Strongly typed with TypeScript for enhanced development experience.
- **Reusable Decorators**: Custom decorators for better modularization of tests and steps.
- **Configurable Environment**: Centralized configuration management for different environments.
- **Interface-Driven Design**: Clear and scalable interfaces for configuration and settings.
- **Example Tests**: Ready-to-use examples to help you get started quickly.
- **Demo Video Recording**: Easily record videos of test runs and attach them as demos to Jira tasks.

---

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd playwright-boilerplate
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your `.env` file:

- Copy `.env.template` to `.env`.
- Update environment variables as required.

---

## Usage

1. Run the tests:

   ```bash
   npm test
   ```

2. Run tests in headed mode:

   ```bash
   npm run test:headed
   ```

3. Record demo videos:

- Use the `video.fixture` to enable recording.

  - Merge `video.fixture` with your `application.fixture` (example):

    ```typescript
    import { mergeTests, test as base } from '@playwright/test';

    import { AdminPage } from '@pages/admin.page';

    import { test as videoTest } from './video.fixture';

    interface ApplicationFixture {
      adminPage: AdminPage;
    }

    const applicationTest = base.extend<ApplicationFixture>({
      adminPage: async ({ page }, use) => {
        const adminPage = new AdminPage(page);
        await use(adminPage);
      },
    });

    export const test = mergeTests(applicationTest, videoTest);
    ```

- Run the command to record:

  ```bash
  npm run test:ui:record
  ```

- After running, find the recorded videos in the `test-results` folder.

4. Use the configuration and custom decorators to create modular tests in the `src/tests` folder.

---

## Folder Structure

### Root Level

- **`playwright.config.ts`**: Central Playwright configuration file for browser settings and test options.
- **`package.json`**: Lists dependencies and scripts.
- **`tsconfig.json`**: TypeScript compiler configuration.

### `src` Folder

The `src` folder is organized into a modular structure with the following subfolders:

1. **`config/`**

- Centralized configuration for the project, such as environment-specific settings.
- Example: `environment.config.ts`.

2. **`decorators/`**

- Reusable decorators to enhance test modularity and abstraction.
- Example: `field-step.decorator.ts`, `step.decorator.ts`.

3. **`fixtures/`**

- Contains reusable setup and teardown logic for tests.
- Examples: `api.fixture.ts`, `video.fixture.ts`.

4. **`interfaces/`**

- TypeScript interfaces that define the structure of configurations, settings, and more.
- Example: `environment.interface.ts`, `playwright-config.interface.ts`.

5. **`models/`**

- Represents the view models used across the application or tests.
- Useful for maintaining consistency in view data manipulation.

6. **`test-data/`**

- Stores static test data, such as JSON files or mock data.
- Helps ensure test reproducibility.

7. **`pages/`**

- Implements the [Page Object Model (POM)](https://playwright.dev/docs/pom) design pattern for Playwright tests.
- Organizes locators and actions related to individual pages.

8. **`tests/`**

- Contains all test cases organized by feature or module.
- Example: `example.spec.ts`.

9. **`utils/`**

- Utility functions and helpers for common tasks, such as data manipulation, API calls, etc.

---

## Configuration

### `playwright.config.ts`

- Define browser options, test directory, and timeout settings.
- Example snippet:

  ```typescript
  import { defineConfig } from '@playwright/test';

  export default defineConfig({
    use: {
      browserName: 'chromium',
      headless: false,
    },
  });
  ```

### `environment.config.ts`

- Configure environment-specific settings such as URLs and API keys.

---

## Examples

### Sample Test

An example from `example.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('https://example.com');
  const title = await page.title();
  expect(title).toBe('Example Domain');
});
```

### Sample Video Test

```typescript
import { test } from '@/fixtures/application.fixture';

test('recorded test', async ({ page }) => {
  await page.goto('https://example.com');
  await page.click('text=Example');
});
```

---

## Dependencies

- **Playwright**: Browser automation framework.
- **TypeScript**: Type safety and enhanced developer experience.
- **ESLint**: Linter for maintaining code quality.
- **Prettier**: Code formatter for consistent style.

Full list of dependencies is available in `package.json`.

---

## Troubleshooting

- **Tests not running?**

  - Ensure all dependencies are installed with `npm install`.
  - Check the `.env` file for missing variables.

- **Browser not launching?**

  - Verify Playwright browsers are installed with:
    ```bash
    npx playwright install
    ```

- **Videos not recording?**

  - Verify that `video.fixture` is merged correctly.
  - Run the recording command: `npm run test:ui:record`.

---

## Contributing

1. Fork the repository.
2. Create a new feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).
