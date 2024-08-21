
//board description
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

// snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

// food 
var foodX;
var foodY;

var velocityX = 0;
var velocityY = 1;

var isGame = true;

window.onload = function() {
    board = document.getElementById("game-board");
    board.style.border = "2px solid white";
    board.height = rows * blockSize; 
    board.width = cols * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);
    document.addEventListener("keyup", (event) => {
        if (event.key == "p") {
            isGame = false;
        }
    })

    if (isGame) {
        setInterval(update, 1000/10);
    }
}

function update() {
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "lime";
    snakeX += velocityX*blockSize;
    snakeY += velocityY*blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);
    
    if (snakeX == foodX && snakeY == foodY) {
        placeFood()
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY == 0) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY == 0) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowRight" && velocityX == 0) {
        velocityX = 1;
        velocityY = 0;
    }
    else if (e.code == "ArrowLeft" && velocityX == 0) {
        velocityX = -1;
        velocityY = 0;
    }
}

function placeFood() {
    // make sure its between 0 and cols and 0 and rows
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

