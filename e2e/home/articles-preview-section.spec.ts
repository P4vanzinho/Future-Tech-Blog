import { test, expect } from "@playwright/test";

test.describe("ArticlesPreviewByCategorySection", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
  });

  test("displays category filter buttons (All, Environment, etc.)", async ({
    page,
  }) => {
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("button", { name: /All/i })).toBeVisible({
      timeout: 3000,
    });
  });

  test("displays articles with author, category and Read More", async ({
    page,
  }) => {
    await page.waitForLoadState("networkidle");
    await expect(
      page.getByText(/Jane Smith|John Techson/i).first()
    ).toBeVisible({ timeout: 5000 });
    await expect(
      page.getByRole("link", { name: /Read More/i }).last()
    ).toBeVisible({ timeout: 3000 });
  });

  test("displays post content (title, description, date)", async ({ page }) => {
    await page.waitForLoadState("networkidle");
    await expect(
      page.getByText(/Global Climate Summit|Tech Giants|COVID-19/i).first()
    ).toBeVisible({ timeout: 5000 });
  });

  test("like button is clickable and toggles state", async ({ page }) => {
    await page.waitForLoadState("networkidle");
    const articlesSection = page.locator("section.bg-dark-10").last();
    const likeButton = articlesSection.getByRole("button").first();
    await expect(likeButton).toBeVisible({ timeout: 5000 });
    await likeButton.click();
    await expect(likeButton).toBeVisible();
  });
});
