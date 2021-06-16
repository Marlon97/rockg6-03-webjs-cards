const express = require('express');
const app = express();

app.use(express.static('public'))

const { Deck, Hand } = require('./app/deck/deck');

const deck = new Deck();

app.get('/', (req, res) => {
    res.send(`<html>
    <head>
      <title>Deck.js</title>
      <link rel="stylesheet" href="./Styles/main.css">
    </head>
    <body>
      <h1>Deck.js</h1>

      <div class="deck">${deck.cards
        .map((card) => {
            const number = card.slice(0, -1);
            const symbol = card.slice(-1);
            const isNumber = !isNaN(number);
            return `<div class="card" symbol="${symbol}" number="${number}">
            <div class="card-corner top-left">
              <div>${number}</div>
              <div>${symbol}</div>
            </div>
            <div class="symbols">
              ${(isNumber) ? `${new Array(parseInt(number))
                .fill(symbol)
                .map((cardSymbol) => `
                  <div>${cardSymbol}</div>
                `)
                .join('')
            }` : ''}
            </div>
            <div class="card-corner bottom-right">
              <div>${number}</div>
              <div>${symbol}</div>
            </div>
          </div>`
        })
        .join('')
    }</div>

    </body>

  </html>`);
});

app.listen(4001, () => {
    console.log('Server running on port 4001');
});

