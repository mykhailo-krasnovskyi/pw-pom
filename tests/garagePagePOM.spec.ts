import { test, expect } from '@playwright/test';
import SignInForm from '../src/page-objects/components/forms/SignInForm';
import OuterHeader from '../src/page-objects/components/OuterHeader';
import GaragePage from '../src/page-objects/pages/GaragePage';
import mainUser from '../src/test-data/credentials';

test.describe(('Garage page'), async () => {
    let signInForm;
    let outerHeader;
    let garagePage;

    test.beforeEach(async ({ page }) => {
        signInForm = new SignInForm(page);
        outerHeader = new OuterHeader(page);
        garagePage = new GaragePage(page);
        await page.goto('/');
        await outerHeader.openSignInForm();
        await signInForm.fillInLoginForm(mainUser.email, mainUser.password);
        await expect(await garagePage.pageHeader).toBeVisible();

    })

    test('Test Last Added car', async ({ page }) => {
        expect(await garagePage.getLastCarName()).toBe('Ford Fiesta');

    });


})
