const puppeteer = require('puppeteer');

const HEROKU_UAT_APP_WEB_URL = process.env.HEROKU_UAT_APP_WEB_URL || 'http://m.weekendesk.fr';
const locale = 'fr_FR';

describe('Check mobile website is up', () => {
  it('should go to mobile website without js error', async () => {
    this.browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    this.page = await this.browser.newPage();
    this.page.on('console', msg => {
      expect(msg._type).not.toEqual('error');
    });
    await this.page.goto(HEROKU_UAT_APP_WEB_URL);
  });

  it('should have id app in the dom', async() => {
    expect(await this.page.$('#app')).not.toBeNull();
  });

  it('should have the good locale in the redux initial state', async() => {
    const preloadedStateScript = await this.page.$eval('#preloaded-state', (element) => {
      return element.innerHTML
    })
    const preloadedState = JSON.parse(
      preloadedStateScript.substring(preloadedStateScript.indexOf('=') + 1),
    );
    expect(preloadedState.application.locale).toEqual(locale);
  });

  it('should close the browser', async () => {
    await this.browser.close();
  });
});
