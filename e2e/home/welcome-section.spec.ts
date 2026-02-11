import { test, expect } from "@playwright/test";

test.describe("WelcomeToOurNewHubSection", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
  });

  test("displays section title", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Welcome to Our News Hub/i })
    ).toBeVisible();
  });

  test("displays main heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Discover the World of Headlines/i })
    ).toBeVisible();
  });

  test("displays View All News button", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: /View All News/i })
    ).toBeVisible();
  });
});
