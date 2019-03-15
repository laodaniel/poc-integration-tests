const puppeteer = require('puppeteer');

const HEROKU_UAT_APP_WEB_URL = 'http://localhost:8080';

describe('Check mobile website is up', () => {
  it('should have id app in the dom', async() => {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    page.on('console', msg => {
      expect(msg._type).not.toEqual('error');
    });

    await page.goto(HEROKU_UAT_APP_WEB_URL);
    expect(await page.$('#app')).not.toBeNull();
    await browser.close();
  })
})

