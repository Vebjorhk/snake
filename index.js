
//board description
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

window.onload = function() {
    board = document.getElementById("game-board");
    board.style.border = "2px solid white";
    board.height = rows * blockSize; 
    board.width = cols * blockSize;
    context = board.getContext("2d");

    update();
}

function update() {
    contex.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height)
}
