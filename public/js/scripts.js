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

const createCard = (card) => {
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
            <div class="front">
                ${createCardCorner(number, symbol)}
                ${createCardSymbols(number, symbol, isNumber)}
                ${createCardCorner(number, symbol)}
            </div>
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

    return cardDiv;
}

const createDeck = async (selector, path) => {
    const container = document.querySelector(selector);
    const cards = await  (await fetch(path)).json();
    cards.forEach((card) => {
        container.append(createCard(card));
    });
}

window.addEventListener('load', function() {
    (async () => {
        await createDeck('.deck.widow', '/widow');
        const cardSiZe = 5;
        await createDeck('.deck.hand', `/deck/${cardSiZe}`);
    })();
});
