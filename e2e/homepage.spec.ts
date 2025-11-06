import { test, expect } from '@playwright/test';

test('homepage opens and displays content', async ({ page }) => {

  await page.goto('/');

  // wait for page to load
  await page.waitForLoadState('domcontentloaded');

  // verify if url contains localhost:3000
  expect(page.url()).toContain('localhost:3000');

  // verify if page has HTML structure
  const html = await page.locator('html').count();
  expect(html).toBeGreaterThan(0);

  // verify page has body content
  const bodyExists = await page.locator('body').count();
  expect(bodyExists).toBeGreaterThan(0);

  // verify page title exists (metadata title)
  const title = await page.title();
  expect(title).toBeTruthy();
  expect(title.length).toBeGreaterThan(0);
});

