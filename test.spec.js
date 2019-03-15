const puppeteer = require('puppeteer');

const HEROKU_UAT_APP_WEB_URL = 'http://localhost:8080';

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

  it('should close the browser', async () => {
    await this.browser.close();
  });
});
