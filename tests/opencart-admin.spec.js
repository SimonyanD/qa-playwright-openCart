const { test, expect } = require('@playwright/test');
// Import Playwright test tools

test('Admin can login successfully', async ({ page }) => {
  // TEST 1: Valid login - should succeed

  await page.goto('http://localhost/admin');
  // Open admin login page

  await page.getByRole('textbox', { name: 'Username' }).fill('admin');
  // Type correct username

  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  // Type correct password

  await page.getByRole('button', { name: ' Login' }).click();
  // Click login button

  await page.waitForURL(/dashboard/);
  // Wait for redirect to dashboard

  await expect(page).toHaveURL(/dashboard/);
  // Verify we are on dashboard - login was successful

});

test('Admin cannot login with wrong password', async ({ page }) => {

  await page.goto('http://localhost/admin');
  // Open admin login page

  await page.getByRole('textbox', { name: 'Username' }).fill('admin');
  // Type correct username

  await page.getByRole('textbox', { name: 'Password' }).fill('wrongpassword');
  // Type wrong password

  await page.getByRole('button', { name: ' Login' }).click();
  // Click login button

  await page.waitForTimeout(2000);
  // Wait 2 seconds for page to respond

  await expect(page.getByRole('button', { name: ' Login' })).toBeVisible();
  // Verify Login button is STILL visible
  // If login button still shows = we are still on login page
  // = wrong password correctly rejected!

});

test('Admin cannot login with empty fields', async ({ page }) => {

  await page.goto('http://localhost/admin');
  // Open admin login page

  await page.getByRole('button', { name: ' Login' }).click();
  // Click login without filling anything

  await page.waitForTimeout(2000);
  // Wait 2 seconds

  await expect(page.getByRole('button', { name: ' Login' })).toBeVisible();
  // Verify Login button still visible = still on login page
  // = empty fields correctly rejected!

});

test('Admin can logout successfully', async ({ page }) => {

  await page.goto('http://localhost/admin');
  // Open admin login page

  await page.getByRole('textbox', { name: 'Username' }).fill('admin');
  // Fill username field

  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  // Fill password field

  await page.getByRole('button', { name: ' Login' }).click();
  // Click login button

  await page.waitForURL(/dashboard/);
  // Wait until dashboard loads

  await page.locator('#modal-developer').getByRole('button').click();
  // Close Developer Options popup that appears after login

  await page.getByRole('link', { name: ' Logout' }).click();
  // Click Logout link in top right menu

  await page.waitForURL(/login/);
  // Wait until redirected back to login page

  await expect(page.getByRole('button', { name: ' Login' })).toBeVisible();
  // Verify Login button is visible again
  // This confirms we are back on login page = logout successful!

});

test('Login page has correct UI elements', async ({ page }) => {

  await page.goto('http://localhost/admin');
  // Open admin login page

  await expect(page.locator('.card-header')).toBeVisible();
  // Verify header section is visible

  await expect(page.getByText('Please enter your login details.')).toBeVisible();
  // Verify instruction text is visible on page

  await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
  // Verify Username input field is visible

  await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
  // Verify Password input field is visible

  await expect(page.getByRole('button', { name: ' Login' })).toBeVisible();
  // Verify Login button is visible

  await expect(page.getByRole('button', { name: ' Login' })).toBeEnabled();
  // Verify Login button is clickable (not disabled)

});

test('Admin cannot add product with duplicate SEO keyword', async ({ page }) => {

  await page.goto('http://localhost/admin');
  await page.getByRole('textbox', { name: 'Username' }).fill('admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: ' Login' }).click();
  await page.waitForURL(/dashboard/);
  await page.locator('#modal-developer').getByRole('button').click();

  // FIRST: Create product with keyword 'duplicate-test'
  await page.getByRole('link', { name: ' Catalog ' }).click();
  await page.getByRole('link', { name: 'Products' }).click();
  await page.getByRole('link', { name: '+' }).click();
  await page.getByRole('textbox', { name: '* Product Name' }).fill('First Product');
  await page.getByRole('textbox', { name: '* Meta Tag Title' }).fill('First Product');
  await page.getByRole('tab', { name: 'Data' }).click();
  await page.getByRole('textbox', { name: '* Model' }).fill('MODEL-001');
  await page.getByRole('tab', { name: 'SEO' }).click();
  await page.getByRole('textbox', { name: 'Keyword' }).fill('duplicate-test');
  await page.getByTitle('Save').click();
  // First product created with keyword 'duplicate-test'

  // Login again for second product
  await page.goto('http://localhost/admin');
  await page.getByRole('textbox', { name: 'Username' }).fill('admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: ' Login' }).click();
  await page.waitForURL(/dashboard/);
  await page.locator('#modal-developer').getByRole('button').click();

  // Now navigate to add product
  await page.getByRole('link', { name: ' Catalog ' }).click();
  await page.getByRole('link', { name: 'Products' }).click();
  await page.getByRole('link', { name: '+' }).click();

  await page.getByRole('textbox', { name: '* Product Name' }).fill('Second Product');
  await page.getByRole('textbox', { name: '* Meta Tag Title' }).fill('Second Product');
  await page.getByRole('tab', { name: 'Data' }).click();
  await page.getByRole('textbox', { name: '* Model' }).fill('MODEL-002');
  await page.getByRole('tab', { name: 'SEO' }).click();
  await page.getByRole('textbox', { name: 'Keyword' }).fill('duplicate-test');
  await page.getByTitle('Save').click();

  await expect(page.locator('body')).toContainText('SEO URL must be unique');
});