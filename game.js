//game board
var canvas;
var draw; 
var blockSize = 20;
var rows = 40;
var columns = 40;

// var setCanvasSize = function() {
//     canvas.width = columns * blockSize;
//     canvas.height = rows * blockSize;
// }


// snake head
var snakeY = blockSize * 5;
var snakeX = blockSize * 5;

//snake food
var foodY = blockSize * Math.floor(Math.random() * 40);
var foodX = blockSize * Math.floor(Math.random() * 40);

var speedX = 0;
var speedY = 0;


window.onload = function() {
    canvas = document.getElementById("game-board");
    // board.height = rows * blockSize;
    // board.width = columns * blockSize;
    canvas.width = columns * blockSize;
    canvas.height = rows * blockSize;
    draw = canvas.getContext("2d"); 
    
    document.addEventListener("keyup", directionChange);
    setInterval(update, 1000/10);
}


function update() {
    draw.fillStyle = "black";
    draw.fillRect(0, 0, canvas.width, canvas.height )

    draw.fillStyle = "green";
    snakeX += speedX * blockSize
    snakeY += speedY * blockSize
    draw.fillRect(snakeX, snakeY, blockSize, blockSize)

    draw.fillStyle = "yellow";
    draw.fillRect(foodX, foodY, blockSize, blockSize)

}

function directionChange(e) {
    if (e.code == "ArrowUp" && speedY != 1  ) { //snake shouldn't be able to go the opposite direction
        speedX = 0;
        speedY = -1;
    }
    else if (e.code == "ArrowDown" && speedY != -1) { 
        speedX = 0;
        speedY = 1;
    }
    if (e.code == "ArrowLeft") {
        speedX = -1;
        speedY = 0;
    }
    if (e.code == "ArrowRight") {
        speedX = 1;
        speedY = 0;
    }
}