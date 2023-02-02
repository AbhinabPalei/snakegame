// Getting the reference of dom 
// elements
const foodSound = new Audio('https://firebasestorage.googleapis.com/v0/b/fire-and-earn.appspot.com/o/Abhinabfile%2FAUD-20230118-WA0005.mp3?alt=media&token=02ebe836-9e18-4981-9736-601c9d80512e');
const gameOverSound = new Audio('https://firebasestorage.googleapis.com/v0/b/fire-and-earn.appspot.com/o/Abhinabfile%2FAUD-20230118-WA0003.mp3?alt=media&token=f08fb475-e60f-4d5e-a603-f96af1642573');
const moveSound = new Audio('https://firebasestorage.googleapis.com/v0/b/fire-and-earn.appspot.com/o/Abhinabfile%2FAUD-20230118-WA0004.mp3?alt=media&token=16f76da3-6ca9-4810-936a-80e452556855');
const musicSound = new Audio('https://firebasestorage.googleapis.com/v0/b/fire-and-earn.appspot.com/o/Abhinabfile%2FAUD-20230118-WA0006.mp3?alt=media&token=a44ec0c0-fe82-4144-bde1-e91e069c49e6');
let score = 0;


const btnUp = document.querySelector('#UP');
const btnDown = document.querySelector('#DOWN');
const btnLeft = document.querySelector('#LEFT');
const btnRight = document.querySelector('#RIGHT');
const board = document.querySelector(".snake-board");

// Variables
let up = false;
let down = false;
let left = false;
let right = false;

let speed = 6;
let lastPaintTime = 0;

// Snake body array
let snakeArr = [{ x: 14, y: 3 }];
let food = { x: Math.round(Math.random() * (26 - 1) + 1), y: Math.round(Math.random() * (26 - 1) + 1) };
// Direction
let inputDir = { x: 0, y: 0 };

// Main function for game loop
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();

}


function gameEngine() {
 // musicSound.play();

  // Updating the snake array

  if (isCollide(snakeArr)) {
    inputDir = { x: 0, y: 0 };
    alert("Game over! To play again press any key");
    snakeArr = [{ x: 14, y: 3 }];
    gameOverSound.play();
    musicSound.pause();
    score = 0;
  }

  if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
    foodSound.play();
    score += 1;
    scoreBox.innerHTML = "score:" + score;
    snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
    let a = 2;
    let b = 20;

    let j = 1;
    while (snakeArr[j].x === food.x && snakeArr[j].y === food.y) {
      food = { x: Math.round(Math.random() * (b - a) + a), y: Math.round(Math.random() * (b - a) + a) };
      j++;
    }
  }

  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // Display snake head and food
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    let snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    }
    else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  let foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);

}

function isCollide(snakeArr) {


  for (let i = 1; i < snakeArr.length; i++) {
    if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
      return true;
    }
  }

  if (snakeArr[0].x >= 28 || snakeArr[0].x <= 0 || snakeArr[0].y >= 28 || snakeArr[0].y <= 0) {
    return true;
  }

  return false;
}



window.requestAnimationFrame(main);

btnUp.addEventListener("click", () => {
  moveSound.play();
  inputDir.x = 0;
  inputDir.y = -1;
});

btnDown.addEventListener("click", () => {
  moveSound.play();
  inputDir.x = 0;
  inputDir.y = 1;
});

btnLeft.addEventListener("click", () => {
  moveSound.play();
  inputDir.x = -1;
  inputDir.y = 0;
});
btnRight.addEventListener("click", () => {
  moveSound.play();
  inputDir.x = 1;
  inputDir.y = 0;
});