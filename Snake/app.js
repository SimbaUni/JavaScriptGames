document.addEventListener('DOMContentLoaded', () => {

    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')

    const GRID_WIDTH = 10
    const GRID_HEIGHT = 10
    const GRID_SIZE = GRID_WIDTH * GRID_HEIGHT
    const grid = createGrid();
    const squares = Array.from(grid.querySelectorAll('div'))

    
    let width = 10
    let currentIndex = 0 // first div in grid
    let appleIndex = 0 // first div in grid
    let currentSnake = [2, 1, 0] // 2 for head, 0 for tail and 1 for inbetween
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0

    function createGrid() {
        // the main grid
        let grid = document.querySelector(".grid")
        for (let i = 0; i < GRID_SIZE; i++) {
          let gridElement = document.createElement("div")
          grid.appendChild(gridElement)
        }
        return grid;
    }

    // to start and restart game
    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        randomApple()
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 1000
        currentSnake = [2, 1, 0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime)
    }

    // function that deals with all outcomes of the snake
    function moveOutcomes() {

    // deals with the snake hitting border and self
    if (
        (currentSnake[0] + width >= (width * width) && direction === width) || // if snake hits the bottom
        (currentSnake[0] % width === width -1 && direction === 1) || // if snake hits right wall
        (currentSnake[0] % width === 0 && direction === -1) || // if snake hits left wall
        (currentSnake[0] - width < 0 && direction === -width) || // if snake hits the top
        squares[currentSnake[0] + direction].classList.contains('snake') // if snake goes into itself
    ) {
        alert('Game Over!')
        return clearInterval(interval) // this will clear the interval if any of the above happens
    }

    const tail = currentSnake.pop() // removes last iteration of the array and shows it
    squares[tail].classList.remove('snake') // removes class of snake from tail
    currentSnake.unshift(currentSnake[0] + direction) // gives direction to the head of the array

    // deals with snake getting apple
    if(squares[currentSnake[0]].classList.contains('apple')) {
        squares[currentSnake[0]].classList.remove('apple')
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        randomApple()
        score++
        scoreDisplay.textContent = score
        clearInterval(interval)
        intervalTime = intervalTime * speed
        interval = setInterval(moveOutcomes, intervalTime)
    }
    squares[currentSnake[0]].classList.add('snake')
    }

    // generate new apple once apple is eaten
    function randomApple() {
        do {
            appleIndex = Math.floor(Math.random() * squares.length)
        } while(squares[appleIndex].classList.contains('snake'))
        squares[appleIndex].classList.add('apple')
    }

    // assign functions to keycodes
    function control(e) {
        squares[currentIndex].classList.remove('snake') // removing class of snake

        if(e.keyCode === 39) {
            direction = 1 // right arrow on keyboard to go right one square
        } else if (e.keyCode === 38) {
            direction = -width // up arrow to to go up one square
        } else if (e.keyCode === 37) {
            direction = -1 // left arrow to go left one square
        } else if (e.keyCode === 40) {
            direction = +width // down arrow to go down one square
        }
    }

    document.addEventListener('keyup', control)
    startBtn.addEventListener('click', startGame)

})