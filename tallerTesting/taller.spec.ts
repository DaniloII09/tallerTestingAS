import { test, expect } from '@playwright/test';

test('taller', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await expect(page).toHaveTitle(/Swag Labs/);

  await expect(page).toHaveURL('https://www.saucedemo.com/');

  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('button[data-test="add-to-cart-sauce-labs-bike-light"]');

  const cartBadge = await page.locator('.shopping_cart_badge');
  await expect(cartBadge).toHaveText('2');

  await page.click('.shopping_cart_link');

  const items = await page.locator('.cart_item');
  await expect(items).toHaveCount(2);

  const prices = await page.locator('.inventory_item_price');
  const firstPrice = await prices.nth(0).innerText();
  const secondPrice = await prices.nth(1).innerText();

  expect(firstPrice).toBe('$29.99');
  expect(secondPrice).toBe('$9.99');
});
