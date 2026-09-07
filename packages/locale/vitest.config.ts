import { defineConfig } from 'vitest/config';

/** Unit tests for this package only (no DOM). App tests live under apps/merchant-panel. */
export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
