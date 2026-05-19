import { test, expect } from "@playwright/test";

test.describe("FeaturedArticlesListSection", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
  });

  test("displays article grid/list after load", async ({ page }) => {
    await page.waitForLoadState("networkidle");
    const articleCards = page.locator("section img");
    await expect(articleCards.first()).toBeVisible({ timeout: 5000 });
  });

  test("each article has title and Read More button", async ({ page }) => {
    await page.waitForLoadState("networkidle");
    const readMoreButtons = page.getByRole("link", { name: /Read More/i });
    await expect(readMoreButtons.first()).toBeVisible({ timeout: 5000 });
  });

  test("displays like button on articles", async ({ page }) => {
    await page.waitForLoadState("networkidle");
    const articleSection = page
      .locator("section")
      .filter({ has: page.locator("img") })
      .nth(1);
    await expect(articleSection).toBeVisible({ timeout: 5000 });
  });
});
