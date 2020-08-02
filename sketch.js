let alien, alienX, alienY, alienColumn, newFirstColumn, newLastColumn;
let playerX, playerY, playerShip, laser; // player related stuff
let alive; // this is the array of aliens
let spaceLives = 3; // ?
let moveLeft = true; // This dictates if the block of aliens is moving left or not
let toLeft, toRight, toBottom; // This has to do with the rows and columns of the alien block.
let bulletFired, bulletX, bulletY;
let theme;
let gameMode = false;
let laserS;
let score;

function preload () {
  alien = loadImage('Graphics/Alien1.png');
  playerShip = loadImage('Graphics/Player.png');
  theme = loadSound('Sounds/newTheme.mp3');
  laser = loadImage('Graphics/Lasers.png');
  SpaceZ = loadImage('Graphics/Invader.png');
  laserS = loadSound('Sounds/shootingEffect.mp3');
}

function setup () {
  createCanvas(700 , 700);
  background(30);
  alienColumn = 10; // Sets how many aliens will be in the column
  alive = new Array(alienColumn);
  alienX = 20; alienY = 20; // Sets the starting posions of the alien block starting from the top right
  newFirstColumn = 0;
  bulletFired = false;
  setUpAliens();
  newLastColumn = alive[0].length - 1;
  theme.play();
  score = 0;

  playerX = 350;
  playerY = 600;

  toLeft = alienX + (newFirstColumn + 1) * 40;
  toRight = alienX + (newLastColumn + 1) * 40;
  toBottom = alienY + (alive[0].length + 1) * 40;
}

function draw () {
  if (!gameMode) {
    textSize(20);
    stroke('White');
    strokeWeight(8);
    fill(0);
    rect(0, 0, 700, 700);
    image(SpaceZ, 200, 100, 250, 250);
    noStroke();
    rect(200, 250, 150, 150);
    rect(200, 250, 50, 30);
    fill(255);
    fill("black");
    rect(300, 305, 100, 10); // this rect covers a piece of the background image 
                             // that doesn't look asthetically pleasing
    fill("white") 
    text('Press Enter to start the game.', 230, 350);
  }else {
    if (!theme.isPlaying()) {
      theme.play();
    }
    rectMode(CORNER);
    background(30);
    alienBlockMove();
    reDeclare();
    playerMovement();
    image(playerShip, playerX, playerY);
    image(laser, bulletX, bulletY);
    createAlienBLock();
    bulletY -= 5;
    checkHit();
    text(score, 50, 50);
    win();
    lose();
  }
}

function keyPressed () {
  if (keyCode === 13) {
    gameMode = true;
  }
  if (keyCode == 32) {
    laserS.play();
    bulletX = playerX + 36;
    bulletY = playerY - 10;
  }
}

function playerMovement () {
  if (keyIsDown(RIGHT_ARROW) && playerX < 640) {
    playerX += 5;
  }
  if (keyIsDown(LEFT_ARROW) && playerX > -15) {
    playerX -= 5;
  }
  image(playerShip, playerX, playerY);
}

function setUpAliens () {
  for (let x = 0; x < alive.length; x++) {
    alive[x] = Array(5);
    for (let y = 0; y < alive[x].length; y++) {
      alive[x][y] = true;
    }
  }

  for (let i = 0; i < alive.length; i++) {
    console.log(alive[i]);
  }
}

function createAlienBLock () {
  imageMode(CORNER);
  let row = 0;
  let column = 0;
  for (let x = 0; x < alive.length; x++) {
    for (let y = 1; y < alive[x].length; y++) {
      if (alive[x][y] == true) {
        image(alien, alienX + column, alienY + row);
        row += 40;
      }else {
        row += 40;
      }
    }
    row = 0;
    column += 30;
  }
}

function alienBlockMove () {
  if (moveLeft == true) {
    if (toLeft < 30) {
      moveLeft = false;
      moveDown();
    }else {
      alienX -= .9;
    }
  }else {
    if (toRight > 480) {
      moveLeft = true;
      moveDown();
    }else {
      alienX += .9;
    }
  }
}
function moveDown () {
  alienY += 20;
}

//   function checkArray(){
//       let d = 0
//         for(let y = 0; y < alive[newFirstColumn].length; y++){
//             if(alive[newFirstColumn] == false){
//                 d++
//                 console.log(d)
//             }
//             if(d == alive[newFirstColumn].length){
//                 newFirstColumn += 1
//             }
//         }

//         d = 0
//         for(let x = 0; x < alive[newLastColumn]; x++){
//             if(alive[newLastColumn] == false){
//                 d++
//                 console.log(d)
//             }
//             if(d == alive[newLastColumn].length){
//                 newLastColumn -= 1
//             }
//         }

//   }

function reDeclare () {
  toLeft = alienX + (newFirstColumn + 1) * 40;
  toRight = alienX + (newLastColumn + 1) * 40;
  console.log(Math.floor(toLeft) + '->' + Math.floor(toRight) + ': Difference :' + Math.floor(toRight - toLeft));
}

function checkHit () {
  let arrX = 0;
  let arrY = 0;
  arrX = Math.floor((bulletX - alienX) / 40);
  arrY = Math.floor((bulletY - alienY) / 30);
  console.log(arrX + ':' + arrY);
  if (bulletX > alienX && bulletX < toRight + 460 && bulletY > alienY && bulletY < toBottom) {
    if (arrX < alive.length && arrY < alive[0].length && arrX > 0 && arrY > 0) {
      if (alive[arrX][arrY] != false) {
        alive[arrX][arrY] = false;
        bulletX = 90000;
        score += 1000;
      }
    }
  }
}

function win () {
  if (score > 20000) {
    text('YOU WIN!', 60, 60);
  }
}
function lose () {
  if (toBottom == 700) {
    text('YOU LOSE!', 60, 60);
  }
}