const express = require('express');
const app = express();

app.use(express.static('public'))

const { Deck, Hand } = require('./app/deck/deck');

const deck = new Deck();

app.get('/deck', (req,res) => {
   res.send(deck.cards);
});

app.listen(4001, () => {
    console.log('Server running on port 4001');
});

