const { test, expect } = require('@playwright/test');

test('Check navigation elements are visible', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  // ☝️ Open the website

  await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Docs' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'API' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Node.js' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Community' })).toBeVisible();
  // ☝️ Check all navigation elements exist

  console.log('✅ All navigation elements are visible!');
});

test('Check navigation elements have correct text', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  // ☝️ Open the website

  await expect(page.getByRole('link', { name: 'Docs' })).toContainText('Docs');
  await expect(page.getByRole('link', { name: 'API' })).toContainText('API');
  await expect(page.getByRole('button', { name: 'Node.js' })).toContainText('Node.js');
  // ☝️ Check text is correct

  console.log('✅ All navigation text is correct!');
});