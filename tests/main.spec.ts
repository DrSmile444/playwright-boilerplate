import { describe, expect, it } from 'vitest';

import { environmentConfig } from '@config/environment.config';

import { showHello } from '../src/main';
import { OVERALL_PROJECT_RELEASE_VERSION } from '../src/version';

/**
 * Unit tests for showHello function.
 * @see src/main.ts
 */
describe('showHello', () => {
  it('should return "Hello world"', () => {
    expect(showHello()).toBe(`Hello world ${environmentConfig.CI} ${OVERALL_PROJECT_RELEASE_VERSION}`);
  });
});
