const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const port = process.env.PORT || 8080;

app.get('/', async (req, res) => res.send('ok'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));