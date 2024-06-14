// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // directory for test files
  testMatch: '**/*.spec.ts', // or '**/*.test.ts' depending on your convention
});
