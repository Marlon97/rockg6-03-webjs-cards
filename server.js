const express = require('express');
const app = express();

app.use(express.static('public'));

const { Deck, Hand } = require('./app/deck/deck');

const deck = new Deck();

let table = deck.dispatchCards(5);

app.get('/table', (req, res) => {
   res.send(table);
});

app.get('/deck/:size', (req,res) => {
    const { size } = req.params;
    res.send(deck.dispatchCards(parseInt(size)));
});

app.get('/deck', (req,res) => {
   res.send(deck.cards);
});

app.get('/hold', (req,res) => {
    console.log('someone is trying to hold')
    res.send({
        ok: true
    });
});

app.get('/withdraw', (req,res) => {
    console.log('someone is trying to withdraw')
    res.send({
        ok: true
    });
});

app.listen(4001, () => {
    console.log('Server running on port 4001');
});

