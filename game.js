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

var foodY;
var foodX;

spawnFood = () => {
    foodY = blockSize * Math.floor(Math.random() * 40);
    foodX = blockSize * Math.floor(Math.random() * 40);
} 

var speedX = 0;
var speedY = 0;


window.onload = () => {
    canvas = document.getElementById("game-board");
    // board.height = rows * blockSize;
    // board.width = columns * blockSize;
    canvas.width = columns * blockSize;
    canvas.height = rows * blockSize;
    draw = canvas.getContext("2d"); 

    spawnFood();
    document.addEventListener("keyup", directionChange);
    setInterval(update, 1000/10);
}


update = () => {
    draw.fillStyle = "black";
    draw.fillRect(0, 0, canvas.width, canvas.height )

    draw.fillStyle = "yellow";
    draw.fillRect(foodX, foodY, blockSize, blockSize)

    if (snakeX == foodX && snakeY == foodY) {
        spawnFood();
    }

    draw.fillStyle = "gray";
    snakeX += speedX * blockSize
    snakeY += speedY * blockSize
    draw.fillRect(snakeX, snakeY, blockSize, blockSize)

}

directionChange = (e) => {
    if (e.code == "ArrowUp" && speedY != 1  ) { //snake shouldn't be able to go the opposite direction
        speedX = 0;
        speedY = -1;
    }
    else if (e.code == "ArrowDown" && speedY != -1) { 
        speedX = 0;
        speedY = 1;
    }
    else if (e.code == "ArrowLeft" && speedX != 1) {
        speedX = -1;
        speedY = 0;
    }
    else if (e.code == "ArrowRight" && speedX != -1) {
        speedX = 1;
        speedY = 0;
    }
}
