import { test, expect } from "@playwright/test";

// Step
// 1. Add "tests/demotest.ts" in "testMatch" of "playwright.config.ts"
// 2. `npx playwright test`
// 3. `npx playwright codegen` => Auto generate the test script
//! Playwright Recorder cannot capture the hover action or certain action
// 4. `npx playwright show-report` => Show report in browser

test("Auto Script Test", async ({ page }) => {
  await page.goto("https://ecommerce-playground.lambdatest.io/");
  await page.hover(`\/\/*[@id="widget-navbar-217834"]/ul/li[6]/a/div/span`);
  await page.click("'Login'"); // await page.click("text=Login");
  await page.getByPlaceholder("E-Mail Address").click();
  await page.getByPlaceholder("E-Mail Address").fill("m@g.com");
  await page.getByPlaceholder("Password").click();
  await page.getByPlaceholder("Password").fill("1234");
  await page.getByRole("button", { name: "Login" }).click();

  //   await expect(page).toHaveURL("");
});
