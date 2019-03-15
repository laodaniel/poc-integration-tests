const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const port = process.env.PORT || 8080;

app.get('/', async (req, res) => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  page.on('console', msg => {
    console.log(`console log ${msg._type}`);
  });
  await page.goto('http://m.weekendesk.fr');

  await page.$('#app')
  console.log('app exists');

  const preloadedStateScript = await page.$eval('#preloaded-state', (element) => {
    return element.innerHTML
  })
  const preloadedState = JSON.parse(
    preloadedStateScript.substring(preloadedStateScript.indexOf('=') + 1),
  );
  console.log(`locale: ${preloadedState.application.locale}`);
  browser.close();

  res.send('ok');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));