import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  outputDir: './tests/test-results',
  timeout: 30 * 1000,
  retries: 0,
  use: {
    headless: true,
    baseURL: 'http://localhost:5173',
    viewport: { width: 1280, height: 720 },
    trace: 'on-first-retry',
  },
});
