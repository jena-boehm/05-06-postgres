require('dotenv').config();

const Tea = require('./lib/models/tea.js');
const express = require('express');
const app = express();

app.use(express.json());

app.listen('3000', () => {
  console.log('listening on port 3000');
});

app.get('/teas', (req, res) => {
  Tea
    .findById(2)
    .then(teas => res.send(teas));
});

app.get('/teas', (req, res) => {
  Tea
    .find()
    .then(teas => res.send(teas));
});

app.post('/teas', async(req, res) => {
  Tea
    .insert(req.body)
    .then(console.log);
});

app.put('/teas', (req, res) => {
  Tea
    .update(1, { title: 'actual tea', description: 'really cool real live tea', url: 'www.thisistea.com' })
    .then(console.log);
});

app.delete('/teas', (req, res) => {
  Tea
    .delete(1)
    .then(console.log);
});

module.exports = app;
