function MainController() {}

MainController.prototype.from = 0;
MainController.prototype.to = 400;
MainController.prototype.diff = this.to - this.from;
MainController.prototype.dur = 10 * 1000;
MainController.prototype.speed = 10;
MainController.prototype.wormParts = null;
MainController.prototype.currentPart = null;
MainController.prototype.direction = null;
MainController.prototype.oldDirection = null;
MainController.prototype.headCX = false;
MainController.prototype.headCY = false;
MainController.prototype.wormsHead = false;
MainController.prototype.nextPosition = new Array;


MainController.prototype.documentReady = function() {
	// Add keyboard listener.
	window.addEventListener('keydown', mainController.keyListener, true);
	// draw lines
	mainController.drawLines();
	mainController.wormParts = document.getElementsByClassName('worm-part');
	mainController.wormsHead = mainController.wormParts[0];
	mainController.direction = 3;
	mainController.moveWorm = setInterval(
		mainController.animateParts, 200);
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

MainController.prototype.moveWormsBall = function() {
	// create random positioning for dot for the worm to eat
	var cx = (Math.floor(Math.random() * 79 / 2) * 2 + 1) * 5;
	var cy = (Math.floor(Math.random() * 79 / 2) * 2 + 1) * 5;
	wormsBall.setAttribute('cx', cx);
	wormsBall.setAttribute('cy', cy);
}

MainController.prototype.moveWorm = function() {

}

MainController.prototype.animateParts = function() {
	for (var i = 0; i < mainController.wormParts.length; i++) {
		var currentCX = mainController.wormParts[i].getAttribute('cx');
		var currentCY = mainController.wormParts[i].getAttribute('cy');
		var coord = mainController.nextPosition[i];
		var direction = mainController.direction;
		if (coord && coord.x == currentCX && coord.y == currentCY) {
			direction = coord.direction;
			mainController.nextPosition[i] = false;
		}else if (coord){
			direction = mainController.oldDirection;
		}
		mainController.animateWormPart(mainController.wormParts[i], 
			direction);
	};
}

MainController.prototype.animateWormPart = function(wormPart, direction) {
	var coord = null;
	switch (direction) {
		// Left arrow.
		case 0:
			coord = parseInt(wormPart.getAttribute('cy'));
			wormPart.setAttribute('cy', coord - mainController.speed)
			break;
		case 1:
			coord = parseInt(wormPart.getAttribute('cx'));
			wormPart.setAttribute('cx', coord + mainController.speed)
			break;
		case 2:
			coord = parseInt(wormPart.getAttribute('cy'));
			wormPart.setAttribute('cy', coord + mainController.speed)
			break;
		case 3:
			coord = parseInt(wormPart.getAttribute('cx'));
			wormPart.setAttribute('cx', coord - mainController.speed)
			break;
	}
	if (coord > 400 || coord < 0) {
		clearInterval(mainController.moveWorm);
		alert("end game");
	};
}

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
	}
	if (Math.abs(mainController.direction - newDirection) != 2) {
		var coord = new Object;
		coord.x = mainController.wormsHead.getAttribute('cx');
		coord.y = mainController.wormsHead.getAttribute('cy');
		coord.direction = newDirection;
		for (var i = 0; i < mainController.wormParts.length; i++) {
			mainController.nextPosition[i] = coord;
		};
		mainController.oldDirection = mainController.direction;
		mainController.direction = newDirection;
	};
}

function WormPart() {}

var mainController = new MainController();