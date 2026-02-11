import { test, expect } from "@playwright/test";

test.describe("Homepage smoke", () => {
  test("loads and displays main structure", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    await expect(page).toHaveURL("/");
    expect(await page.locator("html").count()).toBe(1);
    expect(await page.locator("body").count()).toBe(1);

    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);
  });
});
