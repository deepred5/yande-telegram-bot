const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');
const bot = require('./bot');

const app = express();
app.use(bodyParser.json());

const { port, token } = config;

app.get('/', (req, res) => res.send('Hello World yanre!'));

app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Express server is listening on ${port}`);
});
