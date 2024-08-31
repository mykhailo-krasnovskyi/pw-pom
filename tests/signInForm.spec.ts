import { test, expect } from '@playwright/test';
import { chromium } from '@playwright/test';


test.describe(('Form Validation'), async () => {
  let page;
  let emailField;


  test.beforeAll(async () => {
    const browser = await chromium.launch();

    //create a context

    const context = await browser.newContext();

    //create a page

    page = await context.newPage();
  })


  test.beforeEach(async ({ }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Sign In' }).click();

    emailField = await page.getByLabel('Email');

  })

  test('Email Validation - incorrect email - using emailField const from describe', async ({ }) => {
    //let emailField = await page.getByLabel('Email');

    await emailField.fill('gsagsagasgasg');
    await emailField.blur();
    await expect(page.getByText('Email is incorrect')).toBeVisible();
  });

  test('Email Validation - empty email', async ({ }) => {
    await page.getByLabel('Email').blur();
    await expect(page.getByText('Email required')).toBeVisible();
  });

  test('Password Validation - empty password', async ({ page }) => {

    await page.getByLabel('Password').focus();
    await page.getByLabel('Password').blur();
    await expect(page.getByText('Password required')).toBeVisible();
  });

  test('Form Validation - incorrect email and password', async ({ page }) => {

    await page.getByLabel('Email').fill('test@test.com');
    await page.getByLabel('Password').fill('test4242');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Wrong email or password')).toBeVisible();
  });

  test('Form Validation - correct email and password', async ({ page }) => {

    await page.getByLabel('Email').fill('michael.krasnovskyi+testUser1@gmail.com');
    await page.getByLabel('Password').fill('ZSgeVQhuU3qkvlG');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('heading', { name: 'Garage' })).toBeVisible();
  });




})
