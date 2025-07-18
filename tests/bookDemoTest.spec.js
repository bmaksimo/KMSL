/**
 * @fileoverview Playwright test for automating the "Book a Demo" form submission on kmslh.com.
 * 
 * This test:
 * 1. Setup handler to accept cookie consent if the banner is present.
 * 2. Navigates to the homepage and clicks the "Book a Demo" link.
 * 3. Checks if the form is visible.
 * 4. Fills out the demo booking form with test data.
 * 5. Submits the form and verifies that the expected Captcha error message appears.
 *
 * Utilities:
 * - `checkInputAndFill`: Helper to check and fill input fields.
 * - `setupConsentHandler`: Handles cookie consent popups.
 * 
 * @module tests/bookDemoTest.spec
 */
import { test, expect } from '@playwright/test';
import { checkInputAndFill } from './utils/demoForm.js';
import { setupConsentHandler } from './utils/consent.js';


test('Book a demo test', async ({ page }) => {

    // Set up the consent handler to automatically accept cookies
    await setupConsentHandler(page);

    //1. Navigate to the homepage
    await page.goto('https://kmslh.com/');
    await page.getByRole('banner').getByRole('link', { name: 'Book a Demo' }).click();

    // Verify that navigation was successful
    await expect(page).toHaveURL('https://kmslh.com/book-a-demo/');

    // Check if the form is visible
    await expect(page.getByRole('heading', { level: 3, name: 'Fill out the form below:' })).toBeVisible();

    //2. Fill in the form with test data
    const firstNameField = await page.getByRole('textbox', { name: 'First name*' });
    await checkInputAndFill(page, firstNameField, 'Brana');

    const lastNameField = await page.getByRole('textbox', { name: 'Last name*' });
    await checkInputAndFill(page, lastNameField, 'Test');

    const eMailField = await page.getByRole('textbox', { name: 'Professional Email*' });
    await checkInputAndFill(page, eMailField, 'testmail@happiestbaby.com');

    const phoneField = await page.getByRole('textbox', { name: 'Phone number*' });
    await checkInputAndFill(page, phoneField, '+38164123456');

    const jobField = await page.getByRole('textbox', { name: 'Job Title*' });
    await checkInputAndFill(page, jobField, 'QA');

    const country = await page.getByLabel('Country/Region*');
    await country.selectOption('Serbia');
    await expect(country).toHaveValue('Serbia');

    const messageField = await page.getByRole('textbox', { name: 'Message' });
    await checkInputAndFill(page, messageField, 'Call me');

    const submitButton = page.getByRole('button', { name: 'Book a demo' });
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();
    await submitButton.click();

    //Verify that the form was submitted
    const errorCaptcha = page
        .getByRole('listitem')
        .filter({ hasText: 'Failed to validate Captcha. Please try again.' });

    // Assert it appears
    await expect(errorCaptcha).toHaveCount(1);
    await expect(errorCaptcha).toBeVisible();
});

test.afterAll(async () => {
    console.log('Done with book demo test');
});