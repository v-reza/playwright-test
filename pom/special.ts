import { Page } from "@playwright/test";

// https://ecommerce-playground.lambdatest.io/index.php?route=common/home
export class special {
  constructor(public page: Page) {}

  async add1stProductToCart() {
    await this.page.hover("//div[@class='image']/a", { strict: false });
    const addBtns = this.page.locator("(//button[@title='Add to Cart'])");
    await addBtns.nth(0).click();
  }

  async isToastVisible() {
    const toast = this.page.locator("//a[.='View Cart ']");
    toast.waitFor({ state: "visible" });
    return toast;
  }
}

export default special;
