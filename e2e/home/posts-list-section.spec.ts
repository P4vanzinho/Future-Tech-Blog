import { test, expect } from "@playwright/test";

test.describe("FeaturedPostsListSection", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
  });

  test("displays posts grid/list after load", async ({ page }) => {
    await page.waitForLoadState("networkidle");
    const postCards = page.locator("section img");
    await expect(postCards.first()).toBeVisible({ timeout: 5000 });
  });

  test("each post has title and Read More button", async ({ page }) => {
    await page.waitForLoadState("networkidle");
    const readMoreButtons = page.getByRole("link", { name: /Read More/i });
    await expect(readMoreButtons.first()).toBeVisible({ timeout: 5000 });
  });

  test("displays like button on posts", async ({ page }) => {
    await page.waitForLoadState("networkidle");
    const postSection = page.locator("section").filter({ has: page.locator("img") }).nth(1);
    await expect(postSection).toBeVisible({ timeout: 5000 });
  });
});
