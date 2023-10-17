import { Page } from "@playwright/test";

// https://ecommerce-playground.lambdatest.io/index.php?route=account/login
export class login {
  constructor(public page: Page) {}

  async loginAct(user: { email: string; password: string }) {
    await this.email(user["email"]);
    await this.password(user["password"]);
    await this.login();
  }

  async email(val: string) {
    await this.page.locator("input#input-email").type(val);
  }

  async password(val: string) {
    await this.page.locator("input#input-password").type(val);
  }

  async forgetPassword() {
    await this.page.click("div.form-group a");
  }

  async login() {
    await Promise.all([
      this.page.waitForNavigation(), //? Wait until the page is fully loaded
      this.page.click(`input[value="Login"]`),
    ]);
  }
}

export default login;
