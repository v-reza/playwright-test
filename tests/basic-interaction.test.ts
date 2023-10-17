import { test, expect, Page } from "@playwright/test";
import moment from "moment";

// Input Element
test("Input", async ({ page }) => {
  const URL1 =
    "https://www.lambdatest.com/selenium-playground/simple-form-demo";
  await page.goto(URL1);
  const msgInput = page.locator("input#user-message");
  //   await msgInput.getAttribute("placeholder"); //? Get the attribute value from html element
  expect(msgInput).toHaveAttribute("placeholder", "Please enter your Message");
  //   await msgInput.inputValue(); //? Get the input value
  await msgInput.type("Typing value");
  await page.waitForTimeout(5000);
});

test("Input Sum", async ({ page }) => {
  const URL1 =
    "https://www.lambdatest.com/selenium-playground/simple-form-demo";
  await page.goto(URL1);
  const sum1 = page.locator("input#sum1");
  const sum2 = page.locator("input#sum2");
  const sumBtn = page.locator(`\/\/*[@id="gettotal"]\/button`);

  const num1 = 2;
  const num2 = 4;
  const total = num1 + num2;
  //   await sum1.fill("" + num1); //? fill() => Value instantly input
  await sum1.type("" + num1); //? type() => Value one by one typing
  await sum2.type("" + num2);
  await sumBtn.click();

  const result = page.locator("p#addmessage");
  // await result.textContent(); //? Get the text message
  await expect(result).toHaveText(`${total}`); //? Check text fully exactly
  await page.waitForTimeout(5000);
});

test("Checkbox", async ({ page }) => {
  const URL1 = "https://www.lambdatest.com/selenium-playground/checkbox-demo";
  await page.goto(URL1);
  const checkbox = page.locator("input#isAgeSelected");
  expect(checkbox).not.toBeChecked();
  await checkbox.check();
  //   await checkbox.click(); //? "check" or "click"
  expect(checkbox).toBeChecked();
  await page.waitForTimeout(5000);
});

// JS Alert
test("JS Alert - Click `ok`", async ({ page }) => {
  const URL1 =
    "https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo";
  await page.goto(URL1);

  page.on("dialog", async (alert) => {
    const msg = alert.message();
    // const defautValue = alert.defaultValue(); //? Get the default value in alert
    console.log("Alert Message: ", msg);
    await alert.accept(); //? Click "ok" in browser alert
  });

  const click1Btn = page.locator("button:has-text('Click Me')").nth(0);
  click1Btn.click();
  await page.waitForTimeout(5000);
});

test("JS Alert - Click `Cancel`", async ({ page }) => {
  const URL1 =
    "https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo";
  await page.goto(URL1);

  page.on("dialog", async (alert) => {
    const msg = alert.message();
    console.log("Alert Message: ", msg);
    await alert.dismiss(); //? Click "cancel" in browser alert
  });

  const click1Btn = page.locator("button:has-text('Click Me')").nth(1);
  click1Btn.click();
  expect(page.locator("#confirm-demo")).toContainText("Cancel!"); //? Check text partially
  await page.waitForTimeout(5000);
});

test("JS Alert - Input value", async ({ page }) => {
  const URL1 =
    "https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo";
  await page.goto(URL1);
  const text = "Hi CCC";
  page.on("dialog", async (alert) => {
    await alert.accept(text);
  });

  const click3Btn = page.locator("button:has-text('Click Me')").nth(2);
  click3Btn.click();
  expect(page.locator("#prompt-demo")).toContainText(text); //? Check text partially
  await page.waitForTimeout(5000);
});

// Modal
test("Modal", async ({ page }) => {
  const URL1 =
    "https://www.lambdatest.com/selenium-playground/bootstrap-modal-demo";
  await page.goto(URL1);

  await page.locator(`//button[@data-target="#myModal"]`).click();
  await page.locator(`(//button[text()="Save Changes"])[1]`).click();
  await page.waitForTimeout(5000);
});

// JS Dropdown
test("JS Dropdown - Select 1 Option", async ({ page }) => {
  const URL1 =
    "https://www.lambdatest.com/selenium-playground/select-dropdown-demo";
  await page.goto(URL1);
  await page.selectOption(`#select-demo`, {
    // label: "Tuesday",
    // value: "Tuesday",
    index: 4,
  });
  await page.waitForTimeout(5000);
});

test("JS Dropdown - Select Multiple Option", async ({ page }) => {
  const URL1 =
    "https://www.lambdatest.com/selenium-playground/select-dropdown-demo";
  await page.goto(URL1);
  await page.selectOption(`#multi-select`, [
    { index: 0 },
    { label: "Florida" },
    { value: "Ohio" },
  ]);
  await page.waitForTimeout(3000);
});

// Custom Dropdown
test("Custom Dropdown", async ({ page }) => {
  const URL1 =
    "https://www.lambdatest.com/selenium-playground/jquery-dropdown-search-demo";
  await page.goto(URL1);
  await selectCountry(page, "India");
  await selectCountry(page, "New Zealand");
  await selectCountry(page, "Japan");
  await page.waitForTimeout(3000);
});

async function selectCountry(page: Page, value: string) {
  await page.click("#country+span");
  await page
    .locator("ul#select2-country-results")
    .locator("li", { hasText: value })
    .click();
}

// Datepicker & Calendar
test("Calendar - 'fill()' by value", async ({ page }) => {
  const url =
    "https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo";
  await page.goto(url);
  let date = "1997-04-13";
  await page.fill("input#birthday", date);
  await page.waitForTimeout(3000);
});

test("Calendar - select date", async ({ page }) => {
  const url =
    "https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo";
  await page.goto(url);
  await page.click("//input[@placeholder='Start date']");
  await selectDate(page, { day: 13, month: "April", year: 1997 });
  await selectDate(page, { day: 13, month: "April", year: 2024 });
  await page.waitForTimeout(3000);
});

async function selectDate(
  page: Page,
  props: { month: string; year: number; day: number }
) {
  const { day, month, year } = props;
  const mmYY = page.locator(
    "(//table[@class='table-condensed']//th[@class='datepicker-switch'])[1]"
  );
  const prev = page.locator(
    "(//table[@class='table-condensed']//th[@class='prev'])[1]"
  );
  const next = page.locator(
    "(//table[@class='table-condensed']//th[@class='next'])[1]"
  );

  const date = `${month} ${year}`;
  const to = moment(date, "MMMM YYYY");
  while ((await mmYY.textContent()) != date) {
    if (to.isBefore()) await prev.click();
    else await next.click();
  }

  //  await page.click("//td[@class='day'][text()='13']");
  await page.click(`//td[text()='${day}']`);
}

// File Download & Upload
test.only("Download File", async ({ page }) => {
  const url =
    "https://www.lambdatest.com/selenium-playground/generate-file-to-download-demo";
  await page.goto(url);
  await page.type("textarea#textbox", "Hi CCC !!!");
  await page.click("button#create");
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.click("a#link-to-download"),
  ]);

  let filename = download.suggestedFilename();
  // filename = "CCC";
  const path = `C:\\Users\\user\\Downloads\\${filename}`;
  await download.saveAs(path);

  await page.waitForTimeout(3000);
});

test("Upload File - Method 1", async ({ page }) => {
  const url = "https://blueimp.github.io/jQuery-File-Upload/";
  await page.goto(url);
  const files = [
    "C:\\Users\\user\\Downloads\\1.2.png",
    "C:\\Users\\user\\Downloads\\1.1.png",
  ];
  await page.setInputFiles("input[type='file']", files);
  await page.waitForTimeout(3000);
});

test("Upload File - Method 2", async ({ page }) => {
  const url = "https://blueimp.github.io/jQuery-File-Upload/";
  await page.goto(url);
  const files = [
    "C:\\Users\\user\\Downloads\\1.2.png",
    "C:\\Users\\user\\Downloads\\1.1.png",
  ];

  const [upload] = await Promise.all([
    page.waitForEvent("filechooser"),
    page.click("input[type='file']"),
  ]);
  const isMultiple = upload.isMultiple();
  if (isMultiple) upload.setFiles(files);
  else upload.setFiles(files[0]);

  await page.waitForTimeout(3000);
});

test("Structure", async ({ page }) => {
  const url =
    "https://www.lambdatest.com/selenium-playground/generate-file-to-download-demo";
  await page.goto(url);
  await page.waitForTimeout(3000);
});

// 3 test block run on 3 different browser in order
//? put "test.only('Task', async()=>{})" to execute specific task and skip the others
