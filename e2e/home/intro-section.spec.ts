import { test, expect } from "@playwright/test";

test.describe("IntroSection (Hero)", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
  });

  test("displays main headline", async ({ page }) => {
    await expect(page.getByText(/Today's Headlines/i).last()).toBeVisible();
  });

  test("displays subheading text about news coverage", async ({ page }) => {
    await expect(
      page.getByText(/Explore the latest news from around the world/i).last()
    ).toBeVisible();
  });

  test("displays 'Stay Informed' or 'Informed' text", async ({ page }) => {
    await expect(page.getByText(/Informed/i).last()).toBeVisible();
  });
});
