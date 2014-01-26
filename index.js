function MainController() {}

MainController.prototype.ballX = 150;
MainController.prototype.ballY = 150;
MainController.prototype.ballDX = 2;
MainController.prototype.ballDY = 4;
MainController.prototype.boardX = 300;
MainController.prototype.boardY = 300;
MainController.prototype.paddleX = 150;
MainController.prototype.paddleH = 10;
MainController.prototype.paddleD = this.boardY - this.paddleH;
MainController.prototype.paddleW = 150;
MainController.prototype.gameLoop = null;
MainController.prototype.wormsBallLoop = null;
MainController.prototype.wormMove = 10;
MainController.prototype.wormSpeed = 100;

MainController.prototype.documentReady = function() {
  // Play the game until the ball stops.
  mainController.gameLoop = setInterval(
    mainController.drawBall, 16);
  mainController.wormsBallLoop = setInterval(
    mainController.moveWormsBall, 3000);
  // Add keyboard listener.
  window.addEventListener('keydown', mainController.whatKey, true);
  // draw lines
  mainController.drawLines();
  mainController.gameLoop = setInterval(
    mainController.moveWorm, mainController.wormSpeed);
}

MainController.prototype.drawBall = function() {
  // Change the ball location.
  mainController.ballX += mainController.ballDX;
  mainController.ballY += mainController.ballDY;
  ball.setAttribute("cx", mainController.ballX);
  ball.setAttribute("cy", mainController.ballY);

  // Bounce on a left or right edge.
  if (mainController.ballX + mainController.ballDX > mainController.boardX - 15 ||
    mainController.ballX + mainController.ballDX < 15) {
    mainController.ballDX = -mainController.ballDX;
  }

  // If ball hits the top, bounce it. 
  if (mainController.ballY + mainController.ballDY < 15)
    mainController.ballDY = -mainController.ballDY;
  // If the ball hits the bottom, check see if it hits a paddle.
  else if (mainController.ballY + mainController.ballDY >
    mainController.boardY - 15) {
    // If the ball hits the paddle, bounce it.
    if (mainController.ballX > mainController.paddleX && mainController.ballX < mainController.paddleX + mainController.paddleW)
      mainController.ballDY = -mainController.ballDY;
    // Otherwise the game is over.
    else {
      clearInterval(mainController.gameLoop);
      // alert("Game over!");
    }
  }
}


MainController.prototype.whatKey = function(evt) {
  switch (evt.keyCode) {
    // Left arrow.
    case 37:
      mainController.paddleX = mainController.paddleX - 20;
      if (mainController.paddleX < 0) mainController.paddleX = 0;
      paddle.setAttribute("x", mainController.paddleX);
      break;

      // Right arrow.
    case 39:
      mainController.paddleX = mainController.paddleX + 20;
      if (mainController.paddleX >
        mainController.boardX - mainController.paddleW) mainController.paddleX = mainController.boardX - mainController.paddleW;
      paddle.setAttribute("x", mainController.paddleX);
      break;
  }
}

MainController.prototype.drawLines = function() {
  for (var i = 10; i <= 400; i += 10) {
    mainController.drawLine(lineX, 'x', i);
    mainController.drawLine(lineY, 'y', i);
  };
}

MainController.prototype.drawLine = function(line, type, i) {
  var newLine = line.cloneNode();
  wormBoard.appendChild(newLine);
  newLine.setAttribute(type + "1", i);
  newLine.setAttribute(type + "2", i);
  newLine.setAttribute("id", 'line' + i);
}

MainController.prototype.moveWormsBall = function(){
  // create random positioning for dot for the worm to eat
  var cx = (Math.floor( Math.random() * 79 / 2 ) * 2 + 1) * 5;
  var cy = (Math.floor( Math.random() * 79 / 2 ) * 2 + 1) * 5;
  wormsBall.setAttribute('cx', cx);
  wormsBall.setAttribute('cy', cy);
}

MainController.prototype.drawWorm = function(){
  
}

MainController.prototype.moveWorm = function(){
  
}

function WormPart(){
  
}

var mainController = new MainController();