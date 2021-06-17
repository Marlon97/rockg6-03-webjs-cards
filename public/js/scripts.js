const createCardCorner = (number, symbol) => {
    return `
            <div class="card-corner">
              <div>${number}</div>
              <div>${symbol}</div>
            </div>
            `;
}

const createCardSymbols = (number, symbol, isNumber) => {
    return number === 'A' ? `<div>${symbol}</div>` : (isNumber?(new Array(parseInt(number)).fill(symbol).map((cardSymbol) => `<div>${cardSymbol}</div>`).join('')):(['J','Q','K'].includes(number)? (`<div class='image'></div>`) : ''));
}

const createCard = (number, symbol, isNumber) => {
    const cardDiv = document.createElement('div');

    cardDiv.classList.add('card');
    cardDiv.setAttribute('symbol',symbol);
    cardDiv.setAttribute('number', number);

    cardDiv.innerHTML = `
            ${createCardCorner(number, symbol)}
            <div class="symbols">
                ${createCardSymbols(number, symbol, isNumber)}
            </div>
            ${createCardCorner(number, symbol)}
          `;

    return cardDiv;
}

window.addEventListener('load', function() {
    (async () => {
        const deck = await  (await fetch('/deck')).json();
        const container = document.querySelector('.deck');



        deck.forEach((card) => {
            const number = card.slice(0, -1);
            const symbol = card.slice(-1);
            const isNumber = !isNaN(number);

            container.append(createCard(number, symbol, isNumber));

        });

    })();
});
