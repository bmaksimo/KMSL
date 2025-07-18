/**
 * @fileoverview Playwright test suite for verifying the accessibility toggles on the KMSLH homepage.
 * 
 * This test:
 * - Sets up a consent handler to automatically accept cookies.
 * - Navigates to the homepage and opens the Accessibility Toolbar.
 * - Checks the visibility of the toolbar and the default state of all accessibility toggles.
 * - Retrieves and compares the computed CSS outline style of the logo before and after toggling the "Highlight Links & Buttons" option.
 * - Ensures that the outline style changes as expected when the toggle is activated.
 * 
 * Utilities:
 * - `checkToggles(page, selector)`: Checks the default state of a given toggle.
 * - `getComputedElementStyle(page)`: Retrieves the computed CSS style of a focused element.
 * - `setupConsentHandler(page)`: Handles cookie consent automatically.
 * 
 * After all tests, logs completion to the console.
 */
import { test, expect } from '@playwright/test';
import { checkToggles } from './utils/checkAccessibilityElements.js';
import { getComputedElementStyle } from './utils/checkAccessibilityElements.js';
import { setupConsentHandler } from './utils/consent.js';


test('accessibility toggles test', async ({ page }) => {
    // Set up the consent handler to automatically accept cookies
    await setupConsentHandler(page);

    //1. Navigate to the homepage
    await page.goto('https://kmslh.com/');
    //Click on the "Accessibility Toolbar" button
    await page.getByRole('button', { name: 'Toggle Accessibility Toolbar' }).click();
    //Check if the Accessibility Toolbar is visible
    await expect(page.locator('//*[@id="acwp-toolbar"]')).toBeVisible();

    //Check if the toggles are in default state
    checkToggles(page, '#acwp-toggler-keyboard');
    checkToggles(page, '#acwp-toggler-animations');
    checkToggles(page, '#acwp-toggler-contrast');
    checkToggles(page, '#acwp-toggler-incfont');
    checkToggles(page, '#acwp-toggler-decfont');
    checkToggles(page, '#acwp-toggler-readable');
    checkToggles(page, '#acwp-toggler-marktitles');
    checkToggles(page, '#acwp-toggler-underline');

    //Get the CSS computed style of the logo before toggling
    await page.getByRole('link', { name: 'Logo' }).focus();
    const outlineBefore = await getComputedElementStyle(page);

    //Turn on the mark titles
    await page.getByText('link Highlight Links & Buttons').click();
    //Get the CSS computed style of the logo after toggling
    const outlineAfterOn = await getComputedElementStyle(page);
    //Verify that the outline has changed
    expect(outlineAfterOn.outline).not.toBe(outlineBefore.outline);

    //Turn off the mark titles
    await page.getByText('link Highlight Links & Buttons').click();
    await page.waitForTimeout(5000); // Wait for the toggle to apply changes
    await page.getByRole('link', { name: 'Logo' }).focus();

    //Get the CSS computed style of the logo after toggling off
    const outlineAfterOff = await getComputedElementStyle(page);
    //Verify that the outline has changed back
    expect(outlineAfterOff.outline).toBe(outlineBefore.outline);
});

test.afterAll(async () => {
    console.log('Done with accessibility toggles test');
});