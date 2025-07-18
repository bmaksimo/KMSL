
import { expect } from '@playwright/test';

/**
 * Verifies that the toggle element specified by the locator is enabled and not checked.
 *
 * @async
 * @param {import('@playwright/test').Page} page - The Playwright page object.
 * @param {string} locator - The selector or locator for the toggle element.
 * @returns {Promise<void>}
 */

/**
 * Retrieves the computed outline and textDecoration styles (CSS) of the currently focused element.
 *
 * @async
 * @param {import('@playwright/test').Page} page - The Playwright page object.
 * @returns {Promise<{ outline: string, textDecoration: string }>} The computed styles.
 */
export async function checkToggles(page, locator) {
    //Verify the toggle is not checked
    await expect(page.locator(locator)).toBeEnabled();
    const toggle = page.locator(locator);
    await expect(toggle).not.toBeChecked();
}

export async function getComputedElementStyle(page) {
    const outline = await page.evaluate(() => {
        const l = document.activeElement;
        const s = getComputedStyle(l);
        return { outline: s.outline, textDecoration: s.textDecoration };
    });
    return outline;
}
