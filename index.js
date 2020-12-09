require('dotenv').config();

const Tea = require('./lib/models/tea.js');
const Houseplant = require('./lib/models/houseplant.js');
const express = require('express');
const app = express();

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello');
});

app.get('/teas', (req, res) => {
  Tea
    .find()
    .then(teas => res.send(teas));
});

app.get('/houseplants', (req, res) => {
  Houseplant
    .find()
    .then(houseplants => res.send(houseplants));
});

app.get('/teas/:id', (req, res) => {
  Tea
    .findById(req.params.id)
    .then(teas => res.send(teas));
});

app.get('/houseplants/:id', (req, res) => {
  Houseplant
    .findById(req.params.id)
    .then(houseplants => res.send(houseplants));
});

app.post('/teas', async(req, res) => {
  Tea
    .insert(req.body)
    .then(teas => res.send(teas));
});

app.post('/houseplants', async(req, res) => {
  Houseplant
    .insert(req.body)
    .then(houseplants => res.send(houseplants));
});

app.put('/teas/:id', (req, res) => {
  Tea
    .update(req.params.id, req.body)
    .then(teas => res.send(teas));
});

app.put('/houseplants/:id', (req, res) => {
  Houseplant
    .update(req.params.id, req.body)
    .then(houseplants => res.send(houseplants));
});

app.delete('/teas/:id', (req, res) => {
  Tea
    .delete(req.params.id)
    .then(teas => res.send(teas));
});

app.delete('/houseplants/:id', (req, res) => {
  Houseplant
    .delete(req.params.id)
    .then(houseplants => res.send(houseplants));
});

module.exports = app;
