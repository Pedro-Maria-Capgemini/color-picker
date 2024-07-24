import { test, expect } from '@playwright/test';

test('should display the input field and submit button', async ({ page }) => {
  await page.goto('http://localhost:3000'); // Replace with your actual app URL

  // Check if the input field exists
  const inputField = page.locator('input[type="text"]');
  await expect(inputField).toBeVisible(); // Assert that the input field is visible

  // Check if the submit button exists
  const submitButton = page.locator('button');
  await expect(submitButton).toBeVisible(); // Assert that the submit button is visible
});

test('should display a warning message when input is out of range', async ({ page }) => {
  await page.goto('http://localhost:3000'); // Replace with your actual app URL

  // Enter an invalid number (out of range)
  const inputField = page.locator('input[type="text"]');
  await inputField.fill('55'); // Fill the input field with an out-of-range number

  // Click the submit button
  const submitButton = page.locator('button');
  await submitButton.click(); // Click the submit button

  // Check if the warning message is displayed
  const warningMessage = page.locator('.text-red-500');
  await expect(warningMessage).toBeVisible(); // Assert that the warning message is visible
});

test('should display the correct color square based on API response', async ({ page }) => {
  await page.goto('http://localhost:3000'); // Replace with your actual app URL

  // Mock the API to return a specific color
  await page.route('**/ServiceTesting/rest/ColorPicker/GetColor/?int=25', route => {
    void route.fulfill({
      status: 200,
      body: 'red', 
    });
  });

  // Enter a valid number within the range
  const inputField = page.locator('input[type="text"]');
  await inputField.fill('25'); // Fill the input field with a valid number

  // Click the submit button
  const submitButton = page.locator('button');
  await submitButton.click(); // Click the submit button

  // Check if the square color is updated based on the API response
  const colorSquare = page.locator('.w-24.h-24');
  await expect(colorSquare).toHaveCSS('background-color', 'rgb(255, 0, 0)'); // Assert that the square has the expected color
});

test('should display an error message when the API request fails', async ({ page }) => {
  await page.goto('http://localhost:3000'); // Replace with your actual app URL

  // Mock the API to return an error
  await page.route('**/ServiceTesting/rest/ColorPicker/GetColor/?int=25', route => {
    void route.fulfill({
      status: 500,
      body: 'Error fetching data', // Mock API to return an error message
    });
  });

  // Enter a valid number within the range
  const inputField = page.locator('input[type="text"]');
  await inputField.fill('25'); // Fill the input field with a valid number

  // Click the submit button
  const submitButton = page.locator('button');
  await submitButton.click(); // Click the submit button

  // Check if the error message is displayed
  const errorMessage = page.locator('text=Error fetching data');
  await expect(errorMessage).toBeVisible(); // Assert that the error message is visible
});

test('should handle invalid input gracefully', async ({ page }) => {
  await page.goto('http://localhost:3000'); // Replace with your actual app URL

  // Enter invalid input (non-numeric)
  const inputField = page.locator('input[type="text"]');
  await inputField.fill('abc'); // Fill the input field with invalid input

  // Click the submit button
  const submitButton = page.locator('button');
  await submitButton.click(); // Click the submit button

  // Check if the error message is displayed
  const errorMessage = page.locator('text=Please enter a valid number.');
  await expect(errorMessage).toBeVisible(); // Assert that the error message is visible
});

test('should update input value on change', async ({ page }) => {
  await page.goto('http://localhost:3000'); // Replace with your actual app URL

  // Enter a valid number within the range
  const inputField = page.locator('input[type="text"]');
  await inputField.fill('34'); // Fill the input field with a valid number

  // Check if the input field value is updated
  await expect(inputField).toHaveValue('34'); // Assert that the input field has the correct value
});

test('should display the initial input value', async ({ page }) => {
  await page.goto('http://localhost:3000'); // Replace with your actual app URL

  // Check if the input field has the initial value
  const inputField = page.locator('input[type="text"]');
  await expect(inputField).toHaveValue(''); // Assert that the input field has the initial empty value
});
