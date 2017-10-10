const TARGET_PAGE_URL = 'https://pwa-app-72fbb.firebaseapp.com/';
// REMEMBER TO ALWAYS RUN APP AND THEN SPECS <=========
module.exports = {
	'Is page had correct URL': (browser) => {
		browser.url(TARGET_PAGE_URL);
		browser.assert.urlEquals(TARGET_PAGE_URL);
		browser.end();
	},

	'Is page had correct title': (browser) => {
		browser.url(TARGET_PAGE_URL);
		browser.getTitle(function(title) {
			this.assert.equal(typeof title, 'string');
			this.assert.equal(title, 'Progressive Web App');
		});
		browser.end();
	},

	'Is app contains correct text?': (browser) => {
		browser.url(TARGET_PAGE_URL);
		browser.waitForElementVisible('body', 3000);
		browser.assert.containsText('.mdl-layout-title', 'First PWA App');
		browser.end();
	},

	'Is main part of app contains proper number of menu elements?': (browser) => {
		browser.url(TARGET_PAGE_URL);
		browser.waitForElementVisible('body', 3000);
		browser.elements('css selector', '.mdl-navigation', (result) => {
			if (result.value.length !== 2) {
				browser.assert.fail('Number of menu is not correct');
			}
		});
		browser.end();
	},

	'Capture screenshot to see manually that page looks correct': (browser) => {
		browser.url(TARGET_PAGE_URL);
		browser.waitForElementVisible('body', 1000);
		const screenshot = './test/e2e/reports/screenshots/screenshot-' + new Date().toISOString().slice(0, -5) + '.png';
		const filename = screenshot.replace(/:/g, '-');
		browser.saveScreenshot(filename);
		browser.end();
	},

	'Check button enable notification is visible': (browser) => {
		browser.url(TARGET_PAGE_URL);
		browser.waitForElementVisible('body', 3000);
		browser.isVisible('.enable-notifications', function(result) {
			this.assert.equal(typeof result, 'object');
			this.assert.equal(result.status, 0);
			this.assert.equal(result.value, true);
		});
		browser.end();
	},

	'Is html has a lang attribute': (browser) => {
		browser.url(TARGET_PAGE_URL);
		browser.assert.attributeContains('html', 'lang', 'en');
		browser.end();
	},

	'Is notification works': (browser) => {
		browser.url(TARGET_PAGE_URL);
		browser.click('.enable-notifications', function(response) {
			this.assert.ok(browser === this, 'Notification showed');
			this.assert.ok(typeof response === 'object', 'We got a response object');
		});
		browser.end();
	}
};
