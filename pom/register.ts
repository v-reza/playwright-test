import { Page } from "@playwright/test";

// https://ecommerce-playground.lambdatest.io/index.php?route=account/register
export class register {
  constructor(public page: Page) {}

  async firstName(val: string) {
    await this.page.locator("input#input-firstname").type(val);
  }

  async lastName(val: string) {
    await this.page.locator("input#input-lastname").type(val);
  }

  async email(val: string) {
    await this.page.locator("input#input-email").type(val);
  }

  async phone(val: string) {
    await this.page.locator("input#input-telephone").type(val);
  }

  async password(val: string) {
    await this.page.locator("input#input-password").type(val);
  }

  async confirmPassword(val: string) {
    await this.page.locator("input#input-confirm").type(val);
  }

  async noSubscribe() {
    await this.page.locator("input#input-newsletter-no").isChecked();
  }

  async agree() {
    await this.page.click("//label[@for='input-agree']");
  }

  async submit() {
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: "networkidle" }), //? Wait until the page is fully loaded
      this.page.click(`input[value="Continue"]`),
    ]);
  }
}

export default register;
