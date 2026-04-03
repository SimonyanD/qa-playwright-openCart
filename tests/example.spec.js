const { test, expect } = require('@playwright/test');

test('open Google and check the title', async ({ page }) => {
  // Open Google
  await page.goto('https://www.google.com');

  // Check the page title contains the word "Google"
  await expect(page).toHaveTitle(/Google/);

  console.log('✅ Google opened successfully!');
});