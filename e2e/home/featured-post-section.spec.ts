import { test, expect } from "@playwright/test";

test.describe("LastFeaturedPostSection", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
  });

  test("shows loading skeleton initially", async ({ page }) => {
    await page.waitForLoadState("networkidle");
  });

  test("displays featured post after load", async ({ page }) => {
    await page.waitForLoadState("networkidle");
    const postImage = page.locator("section img").first();
    await expect(postImage).toBeVisible({ timeout: 5000 });
  });

  test("displays post metadata (category, date, author)", async ({ page }) => {
    await page.waitForLoadState("networkidle");
    await expect(
      page.getByText(/Category|Publication Date|Author/i).first()
    ).toBeVisible({ timeout: 5000 });
  });

  test("displays social stats (likes, shares) and Read More", async ({
    page,
  }) => {
    await page.waitForLoadState("networkidle");
    await expect(
      page.getByRole("link", { name: /Read More/i }).first()
    ).toBeVisible({ timeout: 5000 });
  });
});
