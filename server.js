const express = require('express');
const app = express();

app.use(express.static('public'))

const { Deck, Hand } = require('./app/deck/deck');

const deck = new Deck();

let widow = deck.dispatchCards(5);

app.get('/widow', (req, res) => {
   res.send(widow);
});

app.get('/deck/:size', (req,res) => {
    const { size } = req.params;
    res.send(deck.dispatchCards(parseInt(size)));
});

app.get('/deck', (req,res) => {
   res.send(deck.cards);
});

app.listen(4001, () => {
    console.log('Server running on port 4001');
});

