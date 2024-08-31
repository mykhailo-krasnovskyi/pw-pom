const BasePage = require("./BasePage");

class GaragePage extends BasePage {
    // 
    constructor(page) {
        super(page, '/panel/garage');
        this._pageHeader = page.getByRole('heading', { name: 'Garage' });
        this._lastCarItem = page.locator('.car-list .car-item:nth-child(1)');
    }

    get pageHeader() {
        return this._pageHeader;
    }

    async getLastCarName() {
        return await (await this._lastCarItem.locator('.car_name')).textContent();
    }

}

module.exports = GaragePage;