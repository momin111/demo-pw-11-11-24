import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  const path = require('path');
  const filePath = `file://${path.resolve('order.html')}`;
  await page.goto(filePath);
})
test('Check that place order button is enabled when correct data is filled and popup message is OK', async ({ page }) => {
  const orderButton = page.getByTestId("submit-order")
  const usernameInput = page.getByTestId("username")
  const emailInput = page.getByTestId("email")
  const okPopUp = page.locator("//*[@id=\"popup-message\"]")

  await expect(orderButton).toBeDisabled()
  await usernameInput.fill("testuser")
  await emailInput.fill("testemail@test.com")
  await expect(orderButton).toBeEnabled()
  await orderButton.click()
  await expect(okPopUp).toBeVisible()
});

test('When correct data is removed the button is disabled', async ({ page }) => {
  const orderButton = page.getByTestId("submit-order")
  const usernameInput = page.getByTestId("username")
  const emailInput = page.getByTestId("email")

  await usernameInput.fill("testuser")
  await emailInput.fill("testemail@test.com")
  await expect(orderButton).toBeEnabled()
  await usernameInput.fill("")
  await emailInput.fill("")
  await expect(orderButton).toBeDisabled()
});


