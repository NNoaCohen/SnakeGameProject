const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

const cellSize = 25; // Size of each cell in the grid
const numRows = 20;
const numCols = 20;
var grow = 1;
var x = 0;
var y = 0;

let timeLeft = 15; 
let timeSinceLastFood = 0;
let timerInterval;


var targetRow = 5 * cellSize;;
var targetCol = 5 * cellSize;;
let snakeArr = [{ xx: targetRow, yy: targetCol }];
var foodX = Math.floor(Math.random() * numRows) * cellSize;
var foodY = Math.floor(Math.random() * numCols) * cellSize;
//the board is black
window.onload = function () {
    canvas.height = numRows * cellSize;
    canvas.width = numCols * cellSize;

    setInterval(baseFoodAndSnake, 1000 / 5);
    document.addEventListener("keydown", moveSquare);

timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = "Time left: " + timeLeft;

        if (timeLeft <= 0) {
            alert("GAME OVER - לא אכלת בזמן!");
            clearInterval(timerInterval);
            window.location.reload();
        }
    }, 1000);
}
function baseFoodAndSnake() {
    limit();

    if (foodX === snakeArr[0].xx && snakeArr[0].yy === foodY)
        GrowSnake();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.height, canvas.width);

    ctx.fillStyle = 'red';
    ctx.fillRect(foodX, foodY, cellSize, cellSize);

    for (let i = snakeArr.length - 1; i > 0; i--) {
        snakeArr[i] = snakeArr[i - 1];
    }
    snakeArr.forEach(element => {
        element.xx += x * cellSize;
        element.yy += y * cellSize;
        ctx.fillStyle = 'lime';
        ctx.fillRect(element.xx, element.yy, cellSize, cellSize);
    });


}
function RandomFood() {
    foodX = Math.floor(Math.random() * numRows) * cellSize;
    foodY = Math.floor(Math.random() * numCols) * cellSize;

    ctx.fillStyle = 'red';
    ctx.fillRect(foodX, foodY, cellSize, cellSize);
}

function moveSquare(e) {


    if (e.key == "ArrowUp" && y != 1) {

        y = -1;
        x = 0;
    }

    else if (e.key == "ArrowDown" && y != -1) {
        y = 1;
        x = 0;
    }

    else if (e.key == "ArrowLeft" && x != 1) {
        y = 0;
        x = -1;
    }

    else if (e.key == "ArrowRight" && x != -1) {
        y = 0;
        x = 1;
    }



}

function GrowSnake() {
    snakeArr.push({ xx: numRows, yy: numCols })
    RandomFood();
     timeLeft = 15;

}

function limit() {
    for (let i = 0; i < snakeArr.length; i++)
        for (let j = i + 1; j > snakeArr.length; j++) {
            if (snakeArr[i] === snakeArr[j]) {
                alert("GAMR OVER");
                window.location.reload();
            }

        }
    if (snakeArr[0].xx === 0 || snakeArr[0].yy === 0 ||
        snakeArr[0].xx === numRows * 25 || 
        snakeArr[0].yy === numCols * 25) {
        alert("GAMR OVER");
        window.location.reload();
    }

}
