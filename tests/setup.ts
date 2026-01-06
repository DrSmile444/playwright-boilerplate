import { afterAll, vi } from 'vitest';

// Cleanup after all tests
afterAll(() => {
  vi.clearAllMocks();
});
