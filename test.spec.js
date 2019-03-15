const puppeteer = require('puppeteer');

describe('Check mobile website is up', () => {
  it('should have id app in the dom', async() => {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    await page.goto('http://m.weekendesk.fr');
    expect(await page.$('#app')).not.toBeNull();
    await browser.close();
  })
})