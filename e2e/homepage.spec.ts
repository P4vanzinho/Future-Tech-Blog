import { test, expect } from "@playwright/test";

test("homepage opens and displays content", async ({ page }) => {
  await page.goto("/");

  await page.waitForLoadState("domcontentloaded");

  await expect(page).toHaveURL("/");

  const html = await page.locator("html").count();
  expect(html).toBe(1);

  const bodyExists = await page.locator("body").count();
  expect(bodyExists).toBe(1);

  const title = await page.title();
  expect(title).toBeTruthy();
  expect(title.length).toBeGreaterThan(0);
});

test("homepage displays Welcome to Our News Hub section", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("domcontentloaded");

  await expect(
    page.getByRole("heading", { name: "Discover the World of Headlines" })
  ).toBeVisible();

  await expect(
    page.getByRole("heading", { name: "Welcome to Our News Hub" })
  ).toBeVisible();

  await expect(
    page.getByRole("link", { name: "View All News" })
  ).toBeVisible();
});
