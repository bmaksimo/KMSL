/**
 * Playwright test for the ROI Calculator page on kmslh.com.
 *
 * This test performs the following steps:
 * 1. Navigates to the homepage.
 * 2. Accepts cookie consent if the banner is present.
 * 3. Hovers over the "Knowledge Center" navigation link.
 * 4. Clicks on the "ROI Calculator" submenu link and verifies navigation.
 * 5. Fills out the ROI Calculator form with test data.
 * 6. Accepts cookie consent again if needed.
 * 7. Verifies that the calculation results are displayed and match expected values.
 *
 * Utility:
 * - Uses `acceptCookiesIfPresent` from './utils/consent.js' to handle cookie banners.
 *
 * @module tests/ROICalcTest.spec.js
 * @function
 * @name ROI calc test
 * @param {import('@playwright/test').Page} page - Playwright page object for browser automation.
 */
import { test, expect } from '@playwright/test';
import { acceptCookiesIfPresent } from './utils/consent.js';


test('ROI calc test', async ({ page }) => {
    //1. Navigate to the ROI Calculator page
    await page.goto('https://kmslh.com/');

    const elementLink = page.locator('a.header_panel__nav-list-link', { hasText: 'Knowledge Center' });

    //Check if cookie consent banner is present and click "Allow all" 
    // Check for and accept cookies if shown
    let consentAccepted = await acceptCookiesIfPresent(page);

    // 2. Hover over the "Knowledge Center" link (auto-waits for element to be clickable)
    await elementLink.hover();
    await expect(elementLink).toBeVisible({ timeout: 3000 });
    // 3. Click on the "ROI Calculator" link
    const submenu = page.getByRole('link', { name: 'ROI Calculator' });
    await expect(submenu).toBeVisible({ timeout: 3000 });
    await submenu.click();
    // Verify that navigation was successful
    await expect(page).toHaveURL('https://kmslh.com/roi-calculator/');


    // Check for and accept cookies if shown 
    if (!consentAccepted) {
        consentAccepted = await acceptCookiesIfPresent(page)
    }
    // If consent was not accepted, we can still proceed with the test

    //4. Fill in the form with test data
    await page.locator('#form-field-roi_calc__number_of_employees').getByRole('spinbutton').click();
    await page.locator('#form-field-roi_calc__number_of_employees').getByRole('spinbutton').fill('100');
    await page.locator('#form-field-roi_calc__employee_salary').getByRole('spinbutton').click();
    await page.locator('#form-field-roi_calc__employee_salary').getByRole('spinbutton').fill('50000');
    await page.locator('#form-field-roi_calc__number_of_agents').getByRole('spinbutton').click();
    await page.locator('#form-field-roi_calc__number_of_agents').getByRole('spinbutton').fill('25');
    await page.locator('#form-field-roi_calc__agent_salary').getByRole('spinbutton').click();
    await page.locator('#form-field-roi_calc__agent_salary').getByRole('spinbutton').fill('9600');
    await page.locator('#form-field-roi_calc__number_of_new_agents').getByRole('spinbutton').click();
    await page.locator('#form-field-roi_calc__number_of_new_agents').getByRole('spinbutton').fill('5');
    await page.locator('#form-field-roi_calc__onboarding_time_weeks').getByRole('spinbutton').click();
    await page.locator('#form-field-roi_calc__onboarding_time_weeks').getByRole('spinbutton').fill('4');
    await page.locator('#form-field-roi_calc__ongoing_training_days').getByRole('spinbutton').click();
    await page.locator('#form-field-roi_calc__ongoing_training_days').getByRole('spinbutton').fill('100');
    await page.locator('#form-field-roi_calc__error_rate_percentage').getByRole('spinbutton').click();
    await page.locator('#form-field-roi_calc__error_rate_percentage').getByRole('spinbutton').fill('3');
    await page.locator('#form-field-roi_calc__error_rate_percentage').getByRole('spinbutton').press('Enter');

    if (!consentAccepted) {
        consentAccepted = await acceptCookiesIfPresent(page)
    }

    // Check if the calculation results are visible
    await expect(page.locator('#savings-roi_calc__employee_knowledge')).toHaveText('$41,902');
    await expect(page.locator('#savings-roi_calc__onboarding_training')).toHaveText('$1,846');
    await expect(page.locator('#savings-roi_calc__ongoing_training')).toHaveText('$358,904');
    await expect(page.locator('#savings-roi_calc__error_rate')).toHaveText('$1,800');
    await expect(page.locator('#savings-roi_calc__total')).toHaveText('$404,452');

});
test.afterAll(async () => {
    console.log('Done with ROI calc test');
});