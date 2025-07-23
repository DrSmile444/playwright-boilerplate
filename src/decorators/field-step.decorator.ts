import { test } from '@playwright/test';

/**
 * Decorator to define a test field step. It wraps the method in a Playwright test step.
 * @returns A method decorator.
 * @category Decorator
 * */
// 1. Make `@FieldStep` executable to enable function arguments
export function FieldStep() {
  // 2. Return the original decorator
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  return function decorator(target: Function, context: ClassMethodDecoratorContext) {
    return function replacementMethod(...originalArguments: unknown[]) {
      // 3. Use `stepName` when it's defined or
      // fall back to class name / method name
      const name = `Fill '${this.selector}' with ${JSON.stringify(originalArguments[0])} - ${this.constructor.name}`;
      return test.step(name, () => {
        return target.call(this, ...originalArguments);
      });
    };
  };
}
