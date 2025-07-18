/**
 * @fileoverview Playwright test for searching "leader" in the Knowledge Center on kmslh.com.
 * 
 * This test performs the following steps:
 * 1. Accepts cookie consent if present.
 * 2. Navigates to the homepage.
 * 3. Hovers over the "Knowledge Center" link in the header navigation.
 * 4. Clicks on the "News" submenu link and verifies navigation.
 * 5. Accepts cookie consent again if needed.
 * 6. Searches for the term "leader" using the search box.
 * 7. Verifies that the search results page URL is correct.
 * 8. Checks that at least one search result contains the word "leader" in a heading.
 * 
 * After all tests, logs completion to the console.
 * 
 * @module tests/knowledgeCenterTest.spec
 */
import { test, expect } from '@playwright/test';
import { setupConsentHandler } from './utils/consent.js';

//search "leader" in Knowledge Center on kmslh.com
test('knowledge center test', async ({ page }) => {

  // Set up the consent handler to automatically accept cookies
  await setupConsentHandler(page);

  // 1. Navigate to the homepage
  await page.goto('https://kmslh.com/');
  const elementLink = page.locator('a.header_panel__nav-list-link', { hasText: 'Knowledge Center' });

  // 2. Hover over the "Knowledge Center" link (auto-waits for element to be clickable)
  await elementLink.hover();

  // 3. Click on the "News" link
  const submenu = page.getByRole('link', { name: 'News' });
  await expect(submenu).toBeVisible({ timeout: 3000 });
  await submenu.click();

  // Verify that navigation was successful
  await expect(page).toHaveURL('https://kmslh.com/news/', { timeout: 5000 });

  // 4. Wait for the search input box to appear and type "leader"
  const searchBox = page.getByRole('searchbox', { name: 'Search' });
  await expect(searchBox).toBeVisible();
  await searchBox.fill('leader');
  await page.getByRole('button', { name: 'Search' }).click();
  await page.waitForTimeout(2000); // Wait for search results to load
  await expect(page).toHaveURL('https://kmslh.com/?s=leader');

  // 5. Verify that the search results contain at least one hit
  const heading = page.getByRole('heading', { level: 3 }).first();
  await expect(heading).toHaveText(/leader/i);
});

test.afterAll(async () => {
  console.log('Done with knowledge center test');
});