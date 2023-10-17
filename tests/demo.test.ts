import { chromium, test } from "@playwright/test";

// LanbdaTest Capabilities
const capabilities = {
  browserName: "Chrome",
  browserVersion: "Latest",
  "LT:Options": {
    platform: "Windows 10",
    build: "Playwright Test Build",
    name: "Playwright Test",
    user: "makenaichuweb",
    accessKey: "hEvJXCWGVkYjhvFjH60Rxv6oGHEqouvxsbPMOctSsDSIks0WHL",
    network: true,
    video: true,
    console: true,
    tunnel: false, // Add tunnel configuration if testing locally hosted webpage
    tunnelName: "", // Optional
    geoLocation: "", // Country code can be fetched from "https://www.lambdatest.com"
  },
};

test("Login Test", async ({ page  }) => {
  // const browser = await chromium.launch({ headless: false });
  // const strCAP = encodeURIComponent(JSON.stringify(capabilities));
  // const browser = await chromium.connect(
  //   // `wss://cdp.lambdatest.com/playwright?capabilities=${strCAP}`
  //   { wsEndpoint: "http://localhost:4444" }
  // );

  // const context = await browser.newContext(); //? 1 page
  // const page = await context.newPage(); //? tab in 1 page

  const URL = "https://ecommerce-playground.lambdatest.io/";
  await page.goto(URL);
  await page.hover(`\/\/*[@id="widget-navbar-217834"]/ul/li[6]/a/div/span`);
  await page.click("'Login'"); // await page.click("text=Login");

  const user = { email: "m@g.com", password: "1234" };
  await page.fill("input[name='email']", user.email);
  await page.fill("input[name='password']", user.password);
  await page.click("input[value='Login']");
  await page.waitForTimeout(5000);

  //? Open New Tab
  const URL2 =
    "https://ecommerce-playground.lambdatest.io/index.php?route=account/register";
  // const page2 = await context.newPage(); //? tab in 1 page
  await page.goto(URL2);
  await page.waitForTimeout(5000);

  //? Open New Browser Window
  // const context2 = await browser.newContext();
  // const newPage = await context2.newPage();
  // await newPage.goto(URL);
  // await newPage.waitForTimeout(5000);
});

// https://playwright.dev/

// https://playwright.dev/docs/api/class-selectors

// Step
// 1. Add "tests/demotest.ts" in "testMatch" of "playwright.config.ts"
// 2. `npx playwright test`
// 3. `npx playwright codegen` => Auto generate the test script
//! Playwright Recorder cannot capture the hover action or certain action
// 4. `npx playwright show-report` => Show report in browser
