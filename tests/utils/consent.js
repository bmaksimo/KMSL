// utils/consent.js
//import {page} from '@playwright/test';

/**
 * If a cookie banner appears mid-test, click "Accept All".
 * Returns true if clicked, false otherwise.
 */
export async function acceptCookiesIfPresent(page) {
    const btn = page.locator('button:has-text("Allow all")');
    await page.waitForTimeout(2000); // Wait for the banner to appear
    if (await btn.count() > 0) {
        await btn.first().click();
        console.log('Cookie banner accepted');
        return true;
    }
    console.log('No cookie banner appeared');
    return false;
}
