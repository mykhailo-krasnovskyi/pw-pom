import { test, expect } from '@playwright/test';
import SignInForm from '../src/page-objects/components/forms/SignInForm';
import OuterHeader from '../src/page-objects/components/OuterHeader';
import GaragePage from '../src/page-objects/pages/GaragePage';
import SIGNIN_FORM_ERRORS from '../src/utils/constans';
import mainUser from '../src/test-data/credentials';

test.describe(('Form Validation'), async () => {
    let signInForm;
    let outerHeader;
    let garagePage;

    test.beforeEach(async ({ page }) => {
        signInForm = new SignInForm(page);
        outerHeader = new OuterHeader(page);
        garagePage = new GaragePage(page);
        await page.goto('/');
        await outerHeader.openSignInForm();
    })

    test('Email Validation - incorrect email', async ({ page }) => {
        await signInForm.enterEmail('gsagsagasgasg');
        await signInForm.blurField('email');
        await expect(page.getByText(SIGNIN_FORM_ERRORS.SIGNIN_INCORRECT_EMAIL_ERROR)).toBeVisible();
    });

    test('Email Validation - empty email', async ({ page }) => {
        await signInForm.focusField('email');
        await signInForm.blurField('email');
        await expect(page.getByText(SIGNIN_FORM_ERRORS.SIGNIN_EMPTY_EMAIL_ERROR)).toBeVisible();
    });

    test('Password Validation - empty password', async ({ page }) => {
        await signInForm.focusField('password');
        await signInForm.blurField('password');
        await expect(page.getByText(SIGNIN_FORM_ERRORS.SIGNIN_EMPTY_PASSWORD_ERROR)).toBeVisible();
    });

    test('Form Validation - incorrect email and password', async ({ page }) => {
        await signInForm.fillInLoginForm('test@gsaga.com', 'fasfsa');
        await expect(page.getByText(SIGNIN_FORM_ERRORS.SIGNIN_INCORRECT_CREDENTIALS_ERROR)).toBeVisible();
    });

    test('Form Validation - correct email and password', async ({ page }) => {
        await signInForm.fillInLoginForm(mainUser.email, mainUser.password);
        await expect(await garagePage.pageHeader).toBeVisible();
    });

})
