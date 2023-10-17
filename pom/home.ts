import { Page } from "@playwright/test";

// https://ecommerce-playground.lambdatest.io/index.php?route=common/home
export class home {
  constructor(public page: Page) {}

  async clickSpecial() {
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: "networkidle" }),
      this.page.click(`(//span[contains(text(), 'Special')]/../..)[2]`),
    ]);
  }
}

export default home;
