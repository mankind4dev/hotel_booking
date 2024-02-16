import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test("should allow the user to sign in", async ({ page }) => {
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

//to get the display header links
await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

//registration test
test("should allow the user to register", async ({ page }) => {
//to generate new user when run the test again 
//const testEmail = `register_test_${Math.floor(Math.random() * 90000) + 10000 }@test.com`;
function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

const randomString = generateRandomString(5); // Generate a random string of length 7
const testEmail = `register_test_${randomString}@gmail.com`;


await page.goto(UI_URL);

await page.getByRole("link", { name: "Sign In" }).click();
await page.getByRole("link", { name: "Create an account here" }).click();
await expect(
  page.getByRole("heading", { name: "Create an Account" })
).toBeVisible();

await page.locator("[name=firstName]").fill("FirstName_test")
await page.locator("[name=lastName]").fill("LastName_test")
await page.locator("[name=email]").fill(testEmail)
await page.locator("[name=password]").fill("Passwordtest")
await page.locator("[name=confirmPassword]").fill("Passwordtest")

//to get the button create account
await page.getByRole("button", { name: "Create an Account" }).click()

await expect(page.getByText("Registration Success!")).toBeVisible();
//to get the display header links
await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();

})