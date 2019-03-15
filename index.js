const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => res.send(`
  <div id="app"></div>
  <script>//console.error('Error during react reconciliation')</script>
  <script id="preloaded-state">window.PRELOADED_STATE = {"application": {"locale": "fr_FR"}}</script>
`)),

app.listen(port, () => console.log(`Example app listening on port ${port}!`))