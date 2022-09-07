//game board
var canvas;
var draw; 
var blockSize = 20;
var rows = 35;
var columns = 35;
let score = 0
var scoreBoard = document.querySelector("#score-board")
var resetGame = document.querySelector("#reset-game")

// var setCanvasSize = function() {
//     canvas.width = columns * blockSize;
//     canvas.height = rows * blockSize;
// }


// snake head
// var snakeY = blockSize * 5;
// var snakeX = blockSize * 5;

//snake body
var snake = [
    {x: blockSize * 4, y:0},
    {x: blockSize * 3, y:0},
    {x: blockSize * 2, y:0},
    {x: blockSize, y:0},
    {x: 0, y: 0}
]

drawSnake = () => {
    draw.fillStyle = "gray";
    draw.strokeStyle = "black";
    draw.lineWidth = 2;
    snake.forEach(snakeLink => {
        draw.fillRect(snakeLink.x, snakeLink.y, blockSize, blockSize)
        draw.strokeRect(snakeLink.x, snakeLink.y, blockSize, blockSize)
    })
}

//snake food
var foodY;
var foodX;

spawnFood = () => {
    foodY = blockSize * Math.floor(Math.random() * 35);
    foodX = blockSize * Math.floor(Math.random() * 35);
} 

var speedX = blockSize;
var speedY = 0;


window.onload = () => {
    canvas = document.getElementById("game-board");
    canvas.width = columns * blockSize;
    canvas.height = rows * blockSize;
    draw = canvas.getContext("2d"); 

    spawnFood();
    document.addEventListener("keyup", directionChange);
    setInterval(update, 1000/10);
}


update = () => {
    draw.fillStyle = "aqua";
    draw.fillRect(0, 0, canvas.width, canvas.height )

    draw.fillStyle = "red";
    draw.fillRect(foodX, foodY, blockSize, blockSize)

    drawSnake();
    moveSnake();
    
    // draw.fillStyle = "black";
    // snakeX += speedX * blockSize
    // snakeY += speedY * blockSize
    // draw.fillRect(snakeX, snakeY, blockSize, blockSize)


}

directionChange = (e) => {
    if (e.code == "ArrowUp" && speedY != 1  ) { //snake shouldn't be able to go the opposite direction
        speedX = 0;
        speedY = -1 * blockSize;
    }
    else if (e.code == "ArrowDown" && speedY != -1) { 
        speedX = 0;
        speedY = 1 * blockSize;
    }
    else if (e.code == "ArrowLeft" && speedX != 1) {
        speedX = -1 * blockSize;
        speedY = 0;
    }
    else if (e.code == "ArrowRight" && speedX != -1) {
        speedX = 1 * blockSize;
        speedY = 0;
    }
};


moveSnake = () => {
    const head = {x: snake[0].x + speedX, 
                  y: snake[0].y + speedY};
    snake.unshift(head);
    if (snake[0].x == foodX && snake[0].y == foodY) {
        spawnFood();
        score+=1;
        scoreBoard.textContent = score;
    }
    else{
        snake.pop();
    }
}


// function moveSnake(){
//     const head = {x: snake[0].x + xVelocity,
//                   y: snake[0].y + yVelocity};
    
//     snake.unshift(head);
//     //if food is eaten
//     if(snake[0].x == foodX && snake[0].y == foodY){
//         score+=1;
//         scoreText.textContent = score;
//         createFood();
//     }
//     else{
//         snake.pop();
//     }     
// };