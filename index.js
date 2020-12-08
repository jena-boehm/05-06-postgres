require('dotenv').config();

const Tea = require('./lib/models/tea.js');
const express = require('express');
const app = express();

app.use(express.json());

app.listen('3000', () => {
  console.log('listening on port 3000');
});

app.get('/', (req, res) => {
  res.send('Hello');
});


app.get('/teas', (req, res) => {
  Tea
    .find()
    .then(teas => res.send(teas));
});

app.get('/teas/:id', (req, res) => {
  Tea
    .findById(req.params.id)
    .then(teas => res.send(teas));
});


app.post('/teas', async(req, res) => {
  Tea
    .insert(req.body)
    .then(teas => res.send(teas));
});

app.put('/teas', (req, res) => {
  Tea
    .update(req.params.id, req.body)
    .then(teas => res.send(teas));
});

app.delete('/teas', (req, res) => {
  Tea
    .delete(req.params.id);
});

module.exports = app;
