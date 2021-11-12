document.addEventListener('DOMContentLoaded', () => {

    //card options

    const cardArray = [
        {
            name: 'catblue',
            img: 'images/catblue.jpg'
        },
        {
            name: 'catblue',
            img: 'images/catblue.jpg'
        },
        {
            name: 'catplay',
            img: 'images/catplay.jpg'
        },
        {
            name: 'catplay',
            img: 'images/catplay.jpg'
        },
        {
            name: 'catpose',
            img: 'images/catpose.jpg'
        },
        {
            name: 'catpose',
            img: 'images/catpose.jpg'
        },
        {
            name: 'catsleep',
            img: 'images/catsleep.jpg'
        },
        {
            name: 'catsleep',
            img: 'images/catsleep.jpg'
        },
        {
            name: 'catsmile',
            img: 'images/catsmile.jpg'
        },
        {
            name: 'catsmile',
            img: 'images/catsmile.jpg'
        },
        {
            name: 'cattongue',
            img: 'images/cattongue.jpg'
        },
        {
            name: 'cattongue',
            img: 'images/cattongue.jpg'
        },
    ]

    cardArray.sort(() => 0.5 - Math.random())

    const grid = document.querySelector('.grid')
    const resultDisplay = document.querySelector('#result')
    var cardsChosen = []
    var cardsChosenId = []
    var cardsWon = []
    resultDisplay.textContent = "Flip a card!"

    //create your board
    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            var card = document.createElement('img')
            card.setAttribute('src', 'images/cover.jpg')
            card.setAttribute('data-id', i)
            card.addEventListener('click', flipcard)
            grid.appendChild(card)
        }
    }

    //check for matches
    function checkForMatch() {
        var cards = document.querySelectorAll('img')
        const optionOneId = cardsChosenId[0]
        const optionTwoId = cardsChosenId[1]
        if (cardsChosen[0] === cardsChosen[1]) {
            resultDisplay.textContent = "That's a match!"
            cards[optionOneId].setAttribute('src', 'images/white.jpg')
            cards[optionTwoId].setAttribute('src', 'images/white.jpg')
            cardsWon.push(cardsChosen)
        } else {
            cards[optionOneId].setAttribute('src', 'images/cover.jpg')
            cards[optionTwoId].setAttribute('src', 'images/cover.jpg')
            resultDisplay.textContent = "Sorry not a match!"
        }
        cardsChosen = []
        cardsChosenId = []
        if (cardsWon.length === cardArray.length/2) {
            resultDisplay.textContent = ' Congratulations! You found them all!'
        }
    }

    //flip your card
    function flipcard() {
        var cardId= this.getAttribute('data-id')
        cardsChosen.push(cardArray[cardId].name)
        cardsChosenId.push(cardId)
        this.setAttribute('src', cardArray[cardId].img)
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500)
        }
    }

    createBoard()

})