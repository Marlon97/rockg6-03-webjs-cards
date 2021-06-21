const createCardCorner = (number, symbol) => {
    return `
            <div class="card-corner">
              <div>${number}</div>
              <div>${symbol}</div>
            </div>
            `;
}

const createCardSymbols = (number, symbol, isNumber) => {
    return '<div class="symbols">'+(number === 'A' ? `<div>${symbol}</div>` : (isNumber?(new Array(parseInt(number)).fill(symbol).map((cardSymbol) => `<div>${cardSymbol}</div>`).join('')):(['J','Q','K'].includes(number)? (`<div class='image'></div>`) : '')))+'</div>';
}

const createCardBack = () => {
    return '<div class="back"></div>';
}

const createCardDiv = (card) => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    cardDiv.setAttribute('symbol',card.symbol);
    cardDiv.setAttribute('number', card.number);
    return cardDiv;
}

const createCardFront = (contenido) => {
    return `
        <div class="front">
            ${contenido}
        </div>
    `;
}

const createCard = (card, flipped) => {
    const number = card.slice(0, -1);
    const symbol = card.slice(-1);
    const isNumber = !isNaN(number);
    const cardDiv = createCardDiv({symbol, number});

    /**const cardDiv = document.createElement('div');

    cardDiv.classList.add('card');
    cardDiv.setAttribute('symbol',symbol);
    cardDiv.setAttribute('number', number);**/

    cardDiv.innerHTML = `
        <div class="container">
            ${createCardFront(`
                ${createCardCorner(number, symbol)}
                ${createCardSymbols(number, symbol, isNumber)}
                ${createCardCorner(number, symbol)}
            `)}
            ${createCardBack()}
        </div>
            
          `;

    cardDiv.addEventListener('click', () => {
        if (cardDiv.classList.contains('flipped')){
            cardDiv.classList.remove('flipped');
        }else{
            cardDiv.classList.add('flipped');
        }
    });

    if (flipped) {
        cardDiv.classList.add('flipped');
    }

    return cardDiv;
}

const createDeck = async ({selector, path, flipped}) => {
    const container = document.querySelector(selector);
    const cards = await  (await fetch(path)).json();
    cards.forEach((card, index) => {
        container.append(createCard(card, (index < flipped)));
    });
}

const onClickElementById = (id, callback) => {
    document.getElementById(id).addEventListener('click', callback);
}

window.addEventListener('load', function() {
    (async () => {
        await createDeck({selector:'.deck.table', path:'/table', flipped:2});
        const cardSiZe = 2;
        await createDeck({selector:'.deck.hand', path:`/deck/${cardSiZe}`, flipped: cardSiZe});
        onClickElementById('flip-cards', () => {
            document.querySelectorAll('.deck.hand .card').forEach((card, index) => {
                setTimeout(() => {
                    if(card.classList.contains('flipped')){
                        card.classList.remove('flipped');
                    }else{
                        card.classList.add('flipped');
                    }
                }, (500 * (index)))
            });
        });
        onClickElementById('button-hold', async () => {
            const holdResponse = await (await fetch('/hold')).json();
            console.log("You are holding", holdResponse);
        });
        onClickElementById('button-Withdraw', async () => {
            const withdrawResponse = await (await fetch('/withdraw')).json();
            console.log("withdraw :( ", withdrawResponse);
        });
    })();
});
