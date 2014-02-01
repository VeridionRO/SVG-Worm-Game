function MainController() {}

MainController.prototype.pase = 10;
MainController.prototype.speed = 300;
MainController.prototype.userSpeed = 10;
MainController.prototype.wormParts = null;
MainController.prototype.direction = null;
MainController.prototype.oldDirection = null;
MainController.prototype.wormsHead = false;
MainController.prototype.nextPosition = new Array;
MainController.prototype.nextSpeedCounter = 0;
MainController.prototype.speedIncrement = 10;
MainController.prototype.speedUpStep = 10;
MainController.prototype.score = 0;
MainController.prototype.startupSpeed = 300;

MainController.prototype.documentReady = function() {
	// Add keyboard listener.
	window.addEventListener('keydown', mainController.keyListener, true);
	// draw lines
	mainController.drawLines();
	mainController.wormParts = document.getElementsByClassName('worm-part');
	mainController.wormsHead = mainController.wormParts[0];
	mainController.direction = 3;
	mainController.moveWorm = setInterval(
		mainController.animateParts, mainController.speed);
};

MainController.prototype.drawLines = function() {
	for (var i = 10; i <= 400; i += 10) {
		mainController.drawLine(lineX, 'x', i);
		mainController.drawLine(lineY, 'y', i);
	}
};

MainController.prototype.drawLine = function(line, type, i) {
	var newLine = line.cloneNode();
	wormBoard.appendChild(newLine);
	newLine.setAttribute(type + "1", i);
	newLine.setAttribute(type + "2", i);
	newLine.setAttribute("id", 'line' + i);
};

MainController.prototype.moveWormsBall = function() {
	// create random positioning for dot for the worm to eat
	var cx = (Math.floor(Math.random() * 79 / 2) * 2 + 1) * 5;
	var cy = (Math.floor(Math.random() * 79 / 2) * 2 + 1) * 5;
	wormsBall.setAttribute('cx', cx);
	wormsBall.setAttribute('cy', cy);
};

MainController.prototype.animateParts = function() {
	var addPart = false;
	if (mainController.areEqual(wormsBall, mainController.wormsHead)) {
		mainController.moveWormsBall();
		addPart = true;
	};
	for (var i = 0; i < mainController.wormParts.length; i++) {
		var currentCX = mainController.wormParts[i].getAttribute('cx');
		var currentCY = mainController.wormParts[i].getAttribute('cy');
		var coord = mainController.nextPosition[i];
		if (coord) {
			coord = coord[0];
		};
		var direction = mainController.direction;
		if (coord && coord.x == currentCX && coord.y == currentCY) {
			direction = coord.newDirection;
			mainController.nextPosition[i].shift();
		}else if (coord){
			direction = coord.oldDirection;
		}
		mainController.animateWormPart(mainController.wormParts[i], 
			direction);
	};
	if (addPart) {
		mainController.addWormPart();
		mainController.speedUp();
		mainController.addScore();
	};
}

MainController.prototype.speedUp = function(){
	if (mainController.nextSpeedCounter == mainController.speedUpStep) {
		mainController.nextSpeedCounter = 0;
		mainController.speed -= mainController.speedIncrement;
		clearInterval(mainController.moveWorm);
		mainController.moveWorm = setInterval(
			mainController.animateParts, mainController.speed);
		mainController.userSpeed++;
		speed.innerHTML = 'Speed: ' + mainController.userSpeed;
	};
	mainController.nextSpeedCounter++;
}

MainController.prototype.addScore = function(){
	mainController.score += 10 + mainController.startupSpeed - mainController.speed;
	score.innerHTML = 'Score: ' + mainController.score;
}

MainController.prototype.addWormPart = function(){
	var newNode = mainController.wormsHead.cloneNode();
	newNode.setAttribute('fill', 'yellow');
	wormBoard.appendChild(newNode);
	mainController.animateWormPart(mainController.wormsHead,
		mainController.direction);
}

MainController.prototype.animateWormPart = function(wormPart, direction) {
	var coord = null;
	switch (direction) {
		// Left arrow.
		case 0:
			coord = parseInt(wormPart.getAttribute('cy'));
			wormPart.setAttribute('cy', coord - mainController.pase);
			break;
		case 1:
			coord = parseInt(wormPart.getAttribute('cx'));
			wormPart.setAttribute('cx', coord + mainController.pase);
			break;
		case 2:
			coord = parseInt(wormPart.getAttribute('cy'));
			wormPart.setAttribute('cy', coord + mainController.pase);
			break;
		case 3:
			coord = parseInt(wormPart.getAttribute('cx'));
			wormPart.setAttribute('cx', coord - mainController.pase);
			break;
	}
	if (coord > 400 || coord < 0) {
		clearInterval(mainController.moveWorm);
		alert("end game");
	};
};

MainController.prototype.keyListener = function(evt) {
	var newDirection = null;
	switch (evt.keyCode) {
		// Left arrow.
		case 37:
			newDirection = 3;
			break;
		case 38:
			newDirection = 0;
			break;
			// Right arrow.
		case 39:
			newDirection = 1;
			break;
		case 40:
			newDirection = 2;
			break;
		case 80:
			if (mainController.pase === 0) {
				mainController.pase = 10;
			} else{
				mainController.pase = 0;
			}
			break;
		default:
			break;
	}
	newDirection = mainController.checkNewDirection(newDirection);
	if (newDirection !== null && newDirection !== false) {
		var coord = new Object();
		coord.x = mainController.wormsHead.getAttribute('cx');
		coord.y = mainController.wormsHead.getAttribute('cy');
		coord.oldDirection = mainController.direction;
		coord.newDirection = newDirection;
		for (var i = 0; i < mainController.wormParts.length; i++) {
			if (!mainController.nextPosition[i]) {
				mainController.nextPosition[i] = [];
			}
			mainController.nextPosition[i].push(coord);
		};
		mainController.oldDirection = mainController.direction;
		mainController.direction = newDirection;
	};
};

MainController.prototype.checkNewDirection = function(newDirection){
	if (newDirection == null) {
		return false;
	};

	if (Math.abs(mainController.direction - newDirection) == 2) {
		return false;
	};

	if (mainController.direction == newDirection) {
		return false;
	};

	return newDirection;
};

MainController.prototype.areEqual = function(dot1, dot2){
	dot1X = dot1.getAttribute('cx');
	dot1Y = dot1.getAttribute('cy');
	dot2X = dot2.getAttribute('cx');
	dot2Y = dot2.getAttribute('cy');
	if (dot1X == dot2X && dot1Y == dot2Y) {
		return true;
	};
	return false;
};

function WormPart() {};

var mainController = new MainController();