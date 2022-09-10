//game board
var canvas;
var draw; 
var blockSize = 20;
var rows = 25;
var columns = 25;
let score = 0;
var scoreBoard = document.querySelector("#score-board");
var resetButton = document.querySelector("#reset-game");
var gameOver = false;

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
    foodY = blockSize * Math.floor(Math.random() * 25);
    foodX = blockSize * Math.floor(Math.random() * 25);
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
    resetButton.addEventListener("click", resetGame);
    setInterval(update, 1000/10);
}


update = () => {
    if (gameOver) {
        alert("GAME OVER!")
        return;
    }
    draw.fillStyle = "aqua";
    draw.fillRect(0, 0, canvas.width, canvas.height )

    draw.fillStyle = "red";
    draw.fillRect(foodX, foodY, blockSize, blockSize)

    drawSnake();
    moveSnake();
    checkGameOver();
    


    // if(snake[0].x < 0 || snake[0].x > columns * blocksize || snake[0].y < 0 || snake[0].y > rows * blockSize) {
    //     gameOver = true;
    //     alert ("GAME OVER!");
    // }
    
    // draw.fillStyle = "black";
    // snakeX += speedX * blockSize
    // snakeY += speedY * blockSize
    // draw.fillRect(snakeX, snakeY, blockSize, blockSize)


}

directionChange = (e) => {
    if (e.code == "ArrowUp" && speedY != blockSize  ) { //snake shouldn't be able to go the opposite direction
        speedX = 0;
        speedY = -blockSize;
    }
    else if (e.code == "ArrowDown" && speedY != -blockSize) { 
        speedX = 0;
        speedY = blockSize;
    }
    else if (e.code == "ArrowLeft" && speedX != blockSize) {
        speedX = -blockSize;
        speedY = 0;
    }
    else if (e.code == "ArrowRight" && speedX != -blockSize) {
        speedX = blockSize;
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
};


function checkGameOver(){
    // switch(true){
    //     case (snake[0].x < 0 ):
    //         gameOver = true;
    //         // alert("GAME OVER!")
    //         break;
    //     case (snake[0].x >= canvas.width):
    //         gameOver = true;
    //         // alert("GAME OVER!")
    //         break;
    //     case (snake[0].y < 0):
    //         gameOver = true;
    //         // alert("GAME OVER!")
    //         break;
    //     case (snake[0].y >= canvas.height):
    //         gameOver = true;
    //         // alert("GAME OVER!")
    //         break;
    // }    
    if (snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height){
        gameOver = true;
        return;
    }
    for(let i = 1; i < snake.length; i+=1){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            gameOver = true;
            return;
            // alert("GAME OVER!")
        }
    }
};

resetGame = ()=> {
    score = 0;
    speedX = blockSize;
    speedY = 0;
    snake = [
        {x: blockSize * 4, y:0},
        {x: blockSize * 3, y:0},
        {x: blockSize * 2, y:0},
        {x: blockSize, y:0},
        {x: 0, y: 0}
    ];
}