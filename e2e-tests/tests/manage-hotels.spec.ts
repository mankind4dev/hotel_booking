import { test, expect } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  // Get the sign in button
  await page.getByRole("link", { name: "Sign In" }).click();

  //to jump into the sign page
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  //to locate the email and password in sign in form
  await page.locator("[name=email]").fill("test4@gmail.com");
  await page.locator("[name=password]").fill("test4@gmail.com");

  //to get the button in sign in page
  await page.getByRole("button", { name: "Login" }).click();

  //to ecpect the sign in toast display
  await expect(page.getByText("Sign in Successful!")).toBeVisible();
});

test("should allow user to add a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}add-hotel`);

  await page.locator('[name="name"]').fill("Test Hotel");
  await page.locator('[name="city"]').fill("Test City");
  await page.locator('[name="country"]').fill("Test Country");
  await page
    .locator('[name="description"]')
    .fill("Test this is ad description for the test");
  await page.locator('[name="pricePerNight"]').fill("4000");
  await page.selectOption('select[name="starRating"]', "3");

  await page.getByText("Boutique").click();

  await page.getByLabel("Free Wi-Fi").check();
  await page.getByLabel("Parking").check();

  await page.locator('[name="adultCount"]').fill("2");
  await page.locator('[name="childCount"]').fill("4");

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "ade.jpg"),
    path.join(__dirname, "files", "ade2.jpg"),
  ]);

  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel Save!")).toBeVisible();
});

