import { test, expect } from "@playwright/test";
import { home, login, special, register } from "../pom";

const user = { email: "mail@g.com", password: "1234@pass" };

// test.use({ browserName: "firefox" }); //? Switch to different browser
test.describe("Page Object Model (POM) demo", async () => {
  test("1. Register Test", async ({ page, baseURL }) => {
    const reg = new register(page);
    await page.goto(`${baseURL}route=account/register`);
    await reg.firstName("John");
    await reg.lastName("Doe");
    await reg.email(user["email"]);
    await reg.phone("012234567890");
    await reg.password(user["password"]);
    await reg.confirmPassword(user["password"]);
    await reg.noSubscribe();
    await reg.agree();
    await reg.submit();

    await page.waitForTimeout(5000);
  });

  test("2. Login Test", async ({ page, baseURL }) => {
    const log = new login(page);
    await page.goto(`${baseURL}route=account/login`);
    await log.loginAct(user);
    expect(await page.title()).toBe("My Account");
    await page.waitForTimeout(5000);
  });

  test("3. Add To Cart Test", async ({ page, baseURL }) => {
    const log = new login(page);
    const hom = new home(page);
    const spc = new special(page);

    await page.goto(`${baseURL}route=account/login`);
    await log.loginAct(user);
    expect(await page.title()).toBe("My Account");

    // await hom.clickSpecial();

    await page.goto(`${baseURL}route=product/category&path=20&mz_fm=8`);
    await spc.add1stProductToCart();
    const cartVisible = await spc.isToastVisible();
    expect(cartVisible).toBeVisible();

    await page.waitForTimeout(5000);
  });
});
