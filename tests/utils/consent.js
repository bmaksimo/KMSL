/**
 * Sets up a handler to automatically click the "Allow all" button on a cookie consent banner if it appears during tests.
 *
 * @async
 * @param {import('playwright').Page} page - The Playwright Page object to attach the consent handler to.
 * @returns {Promise<void>} Resolves when the handler is set up.
 */
// utils/consent.js

export async function setupConsentHandler(page) {
    await page.addLocatorHandler(
        page.locator('button:has-text("Allow all")'),
        async (locator) => {
            await locator.click();
            console.log('Consent accepted by handler');
        }
    );
}
