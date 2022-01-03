document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const scoreDisplay = document.querySelector('#score')
    const startButton = document.querySelector('#start-button')
    const width = 10
    console.log(squares)

    //The Tetrominoes
    const lTetromino = [
        [1,width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width]
    ]

    const zTetromino = [
        [0,width,width + 1,width * 2 + 1],
        [width + 1, width + 2,width * 2,width * 2 + 1],
        [0,width,width + 1,width * 2 + 1],
        [width + 1, width + 2,width * 2,width * 2 + 1]
    ]
    
    const tTetromino = [
        [1 ,width,width + 1,width + 2],
        [1 ,width + 1,width + 2,width * 2 + 1],
        [width,width + 1,width + 2,width * 2 + 1],
        [1,width,width + 1,width * 2 + 1]
    ]

    const oTetromino = [
        [0,1,width,width + 1],
        [0,1,width,width + 1],
        [0,1,width,width + 1],
        [0,1,width,width + 1]
    ]

    const iTetromino = [
        [1,width + 1,width * 2 + 1,width * 3 + 1],
        [width,width + 1,width + 2,width + 3],
        [1,width + 1,width * 2 + 1,width * 3 + 1],
        [width,width + 1,width + 2,width + 3]
    ]
    
    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

    let currentPosition = 4
    let currentRotation = 0

    // radomly select a Tetromino and its first rotation
    let random = Math.floor(Math.random()*theTetrominoes.length)
    let current = theTetrominoes[random][0]

    // draw the tetromino
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino')
        })
    } 

    draw()

    // undraw the tetromino 
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
        })
    } 

    // Make the tetromino move down every second
    timerId = setInterval(moveDown, 1000)

    //Assign functions to keycodes
    function control(e){
        if(e.keyCode === 37){
            moveleft()
        } else if(e.keyCode === 38){
            // moveUp()
        } else if(e.keyCode === 39){
            moveRight()
        } else if(e.keyCode === 40){
            moveDown()
        }
    }

    document.addEventListener('keyup', control)
    // Move down function
    function moveDown() {
        undraw()
        currentPosition += width
        draw()
        freeze()
    }

    function freeze(){
        if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            // Start a tetromino falling
            random = Math.floor(Math.random() * theTetrominoes.length)
            current = theTetrominoes[random][currentRotation]
            currentPosition = 4
            draw()
        }
    }
    
    function moveleft(){
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0 )
        if (!isAtLeftEdge) currentPosition -= 1

        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            currentPosition += 1
        }

        draw()
    }

    function moveRight(){
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === 0 )
        if (!isAtRightEdge) currentPosition += 1

        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            currentPosition -= 1
        }

        draw()
    }
    

    















})

