/**
 * Fills an input field and verifies that it is visible, enabled, editable, and that the value is set correctly.
 *
 * @param {import('@playwright/test').Page} page - The Playwright Page object.
 * @param {import('@playwright/test').Locator} locator - The locator for the input element to interact with.
 * @param {string} value - The value to fill into the input field.
 * @returns {Promise<void>} Resolves when the input has been filled and verified.
 */
// utils/demoForm.js
import { expect } from '@playwright/test';

/**
 * Fill an input and verify it's interactable and has the expected value
 * @param {import('@playwright/test').Page} page
 * @param {import('@playwright/test').Locator} locator - textbox locator
 * @param {string} value - text to set
 */
export async function checkInputAndFill(page, locator, value) {
    // Verify it's visible, enabled, and ready for input
    await expect(locator).toBeVisible();
    await expect(locator).toBeEnabled();
    await expect(locator).toBeEditable();

    // Fill and validate that the input has the expected value
    await locator.click();
    await locator.fill(value);
    await expect(locator).toHaveValue(value);
}

export async function fillInputAndVerify(page, locator, value) {
    // Verify the input is visible and enabled
    await expect(locator).toBeVisible();
    await expect(locator).toBeEnabled();
    await expect(locator).toBeEditable();

    // Fill the input field
    await locator.click(); // Ensure the input is focused
    await locator.fill(value);

    // Verify the input field has the expected value
    await expect(locator).toHaveValue(value);
}