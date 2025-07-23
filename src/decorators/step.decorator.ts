// https://www.checklyhq.com/blog/playwright-test-steps-with-typescript-decorators/

import { test } from '@playwright/test';

/**
 * Decorator to define a test step. It wraps the method in a Playwright test step.
 * @param stepName - The name of the step. If not provided, it defaults to the class name and method name.
 * @returns A method decorator.
 * @category Decorator
 *
 * @example
 * ```ts
 * import { Step } from '../decorators/step.decorator';
 *
 * class ProfilePage {
 *  @Step('Create profile')
 *  async create(profile: Profile) {
 *   await this.openForm();
 *   await this.profileForm.fill(profile);
 *   await this.save();
 *  }
 * }
 * ```
 * */
// 1. Make `@Step` executable to enable function arguments
export function Step(stepName?: string) {
  // 2. Return the original decorator
  return function decorator(target: Function, context: ClassMethodDecoratorContext) {
    return function replacementMethod(...originalArguments: unknown[]) {
      // 3. Use `stepName` when it's defined or
      // fall back to class name / method name
      const name = stepName || `${`${this.constructor.name}.${context.name as string}`}`;
      return test.step(name, () => {
        return target.call(this, ...originalArguments);
      });
    };
  };
}
