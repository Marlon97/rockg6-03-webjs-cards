const express = require('express');
const app = express();

const { Deck, Hand } = require('./app/deck/deck');

const deck = new Deck();

app.get('/styles.css', (req, res) => {
   res.send(`
       body {
          background-color: #eee;
        }

        .card {
          background-color: #dfdfdf;
          border: 1px white solid;
          border-radius: 10px;
          margin: 5px;
          width: 100px;
          height: 150px;
          display: inline-block;
          position: relative;
          color: black;
        }

        .card[symbol="♦"],
        .card[symbol="♥"] {
          color: red;
        }

        .card-corner {
          margin: 5px;
          font-family: monospace;
          text-align: center;
          position: absolute;
        }

        .top-left {
          top: 0px;
          left: 0px;
        }

        .bottom-right {
          right: 0px;
          bottom: 0px;
          transform: rotate(0.5turn);
        }

        .symbols {
          position: relative;
          height: 100%;
        }

        .symbols div {
          position: absolute;
          font-size: 28px;
        }
        
        .card[number="2"] .symbols div{
          left: 50%;
          transform: translateX(-50%);
        }
        
        .card[number="2"] .symbols div:nth-child(1) {
          top: 20px;
        }
        
        .card[number="2"] .symbols div:nth-child(2) {
          bottom: 20px;
          transform: translateX(-50%) rotate(0.5turn) ;
        }
        
        .card[number="3"] .symbols div{
          left: 50%;
          transform: translateX(-50%);
        }
        
        .card[number="3"] .symbols div:nth-child(1) {
          top: 20px;
        }
        
        .card[number="3"] .symbols div:nth-child(2),
        .card[number="5"] .symbols div:nth-child(5) {
          left: 50%;
          top: 50%;
          transform: translateX(-50%) translateY(-50%);
        }
        
        .card[number="3"] .symbols div:nth-child(3) {
          bottom: 20px;
          transform: translateX(-50%) rotate(0.5turn) ;
        }
        
        .card[number="4"] .symbols div:nth-child(1),
        .card[number="4"] .symbols div:nth-child(2),
        .card[number="5"] .symbols div:nth-child(1),
        .card[number="5"] .symbols div:nth-child(2){
          top: 20px;
        }
        
        .card[number="4"] .symbols div:nth-child(3), 
        .card[number="4"] .symbols div:nth-child(4),
        .card[number="5"] .symbols div:nth-child(3), 
        .card[number="5"] .symbols div:nth-child(4){
          bottom: 20px;
          transform: rotate(0.5turn) ;
        }
        
        .card[number="4"] .symbols div:nth-child(1),
        .card[number="4"] .symbols div:nth-child(3),
        .card[number="5"] .symbols div:nth-child(1),
        .card[number="5"] .symbols div:nth-child(3){
          left: 20px;
        }
        
        .card[number="4"] .symbols div:nth-child(2),
        .card[number="4"] .symbols div:nth-child(4),
        .card[number="5"] .symbols div:nth-child(2),
        .card[number="5"] .symbols div:nth-child(4){
          right: 20px;
        }
   `);
});

app.get('/', (req, res) => {
    res.send(`<html>
    <head>
      <title>Deck.js</title>
      <link rel="stylesheet" href="./styles.css">
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

