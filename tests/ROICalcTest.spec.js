/**
 * @fileoverview Playwright test for the ROI Calculator page on kmslh.com.
 *
 * This test performs the following steps:
 * 1. Setup handler to accept cookie consent if the banner is present.
 * 2. Navigates to the homepage.
 * 3. Hovers over the "Knowledge Center" navigation link.
 * 4. Clicks on the "ROI Calculator" submenu link and verifies navigation.
 * 5. Fills out the ROI Calculator form with test data.
 * 6. Verifies that the calculation results are displayed and match expected values.
 *
 * Utility:
 * - Uses `setupConsentHandler` from './utils/consent.js' to handle cookie banners when they appear.
 *
 * @module tests/ROICalcTest.spec.js
 * @function
 * @name ROI calc test
 * @param {import('@playwright/test').Page} page - Playwright page object for browser automation.
 */
import { test, expect } from '@playwright/test';
import { setupConsentHandler } from './utils/consent.js';
import { checkInputAndFill } from './utils/demoForm.js';

test('ROI calc test', async ({ page }) => {
    // 1.Set up the consent handler to accept cookies
    await setupConsentHandler(page);

    //2. Navigate to the ROI Calculator page
    await page.goto('https://kmslh.com/');
    const elementLink = page.locator('a.header_panel__nav-list-link', { hasText: 'Knowledge Center' });
    // 3. Hover over the "Knowledge Center" link
    await elementLink.hover();
    await expect(elementLink).toBeVisible({ timeout: 3000 });
    // 4. Click on the "ROI Calculator" link
    const submenu = page.getByRole('link', { name: 'ROI Calculator' });
    await expect(submenu).toBeVisible({ timeout: 3000 });
    await submenu.click();
    // Verify that navigation was successful
    await expect(page).toHaveURL('https://kmslh.com/roi-calculator/');

    //5. Fill in the form with test data
    const number_of_employees = await page.locator('#form-field-roi_calc__number_of_employees').getByRole('spinbutton');
    await checkInputAndFill(page, number_of_employees, '100');
    const employee_salary = await page.locator('#form-field-roi_calc__employee_salary').getByRole('spinbutton');
    await checkInputAndFill(page, employee_salary, '50000');
    const number_of_agents = await page.locator('#form-field-roi_calc__number_of_agents').getByRole('spinbutton');
    await checkInputAndFill(page, number_of_agents, '25');
    const agent_salary = await page.locator('#form-field-roi_calc__agent_salary').getByRole('spinbutton');
    await checkInputAndFill(page, agent_salary, '9600');
    const number_of_new_agents = await page.locator('#form-field-roi_calc__number_of_new_agents').getByRole('spinbutton');
    await checkInputAndFill(page, number_of_new_agents, '5');
    const onboarding_time_weeks = await page.locator('#form-field-roi_calc__onboarding_time_weeks').getByRole('spinbutton');
    await checkInputAndFill(page, onboarding_time_weeks, '4');
    const ongoing_training_days = await page.locator('#form-field-roi_calc__ongoing_training_days').getByRole('spinbutton');
    await checkInputAndFill(page, ongoing_training_days, '100');
    const error_rate_percentage = await page.locator('#form-field-roi_calc__error_rate_percentage').getByRole('spinbutton');
    await checkInputAndFill(page, error_rate_percentage, '3')
    await page.locator('#form-field-roi_calc__error_rate_percentage').getByRole('spinbutton').press('Enter');

    //6. Check if the calculation results are visible
    await expect(page.locator('#savings-roi_calc__employee_knowledge')).toHaveText('$41,902');
    await expect(page.locator('#savings-roi_calc__onboarding_training')).toHaveText('$1,846');
    await expect(page.locator('#savings-roi_calc__ongoing_training')).toHaveText('$358,904');
    await expect(page.locator('#savings-roi_calc__error_rate')).toHaveText('$1,800');
    await expect(page.locator('#savings-roi_calc__total')).toHaveText('$404,452');

});
test.afterAll(async () => {
    console.log('Done with ROI calc test');
});