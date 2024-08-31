class SignInForm {

    constructor(page) {
        this._page = page;
        this._emailField = page.getByLabel('Email')
        this._passwordField = page.getByLabel('Password')
        this._loginButton = page.getByRole('button', { name: 'Login' });
    }

    async enterEmail(email) {
        await this._emailField.fill(email);
    }

    async enterPassword(password) {
        await this._passwordField.fill(password);
    }

    async fillInLoginForm(email, password) {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this._loginButton.click();
    }

    async blurField(fieldName) {
        if (fieldName === "email") {
            await this._emailField.blur();
        } else if (fieldName === "password") {
            await this._passwordField.blur();
        }
    }

    async focusField(fieldName) {
        if (fieldName === "email") {
            await this._emailField.focus();
        } else if (fieldName === "password") {
            await this._passwordField.focus();
        }
    }
}

module.exports = SignInForm;