
//board description
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

var score = 0;
var counter = document.getElementById("current-score");

// snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

// food 
var foodX;
var foodY;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

var is_over = false;
var is_pause = false;

window.onload = function() {
    board = document.getElementById("game-board");
    board.style.border = "2px solid white";
    board.height = rows * blockSize; 
    board.width = cols * blockSize;
    context = board.getContext("2d");


    placeFood();
    document.addEventListener("keyup", changeDirection);
    document.addEventListener("keyup", (e) => {
        if (e.key == "p") {
            is_pause = !is_pause;
        }
    });

    setInterval(update, 1000/10);
}

function update() {
    if (is_over) {
        return
    }

    if (is_pause) {
        return
    }
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);
    
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        score++;
        counter.innerHTML = `Score: ${score}`;
        placeFood()
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        // before update bellow, therefore it works
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "lime";
    snakeX += velocityX*blockSize;
    snakeY += velocityY*blockSize;
    is_over = false;

    context.fillRect(snakeX, snakeY, blockSize, blockSize);

        for (let i = 0; i < snakeBody.length; i++) {
            context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)
    }

    // condtions for game over 

    if (snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize) {
        is_over = true;
        counter.innerHTML = "Score: 0";
    }

    for (let index = 0; index < snakeBody.length; index++) {
        if (snakeBody[index][0] == snakeX && snakeBody[index][1] == snakeY) {
            is_over = true;
            counter.innerHTML = "Score: 0";
        }
        
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

