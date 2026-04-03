const { test, expect } = require('@playwright/test');
// ☝️ Load Playwright tools

async function login(page) {
  // ☝️ This is a helper — reusable login steps in one place
  await page.goto('https://www.saucedemo.com');
  // ☝️ Open the shop
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  // ☝️ Fill and submit the login form
}

test('Login to the shop', async ({ page }) => {
  await login(page);
  // ☝️ Call the helper instead of repeating 4 lines

  await expect(page).toHaveURL(/inventory/);
  // ☝️ Check we landed on the products page
  console.log('✅ Login successful!');
});

test('Products are visible after login', async ({ page }) => {
  await login(page);
  // ☝️ Reuse the same helper

  const products = page.locator('.inventory_item');
  // ☝️ Find all products on the page
  const count = await products.count();
  // ☝️ Count them
  expect(count).toBeGreaterThan(0);
  // ☝️ Make sure at least 1 exists
  console.log(`✅ Found ${count} products!`);
});

test('Add a product to cart', async ({ page }) => {
  await login(page);
  // ☝️ Reuse the same helper

  await page.locator('.inventory_item button').first().click();
  // ☝️ Click the first "Add to cart" button
  const cartCount = await page.locator('.shopping_cart_badge').innerText();
  // ☝️ Read the number on the cart icon
  expect(cartCount).toBe('1');
  // ☝️ Check cart shows 1 item
  console.log(`✅ Cart has ${cartCount} item!`);
});