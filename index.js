function MainController() {}

MainController.prototype.from = 0;
MainController.prototype.to = 400;
MainController.prototype.diff = this.to - this.from;
MainController.prototype.dur = 10 * 1000;
MainController.prototype.speed = 5;
MainController.prototype.wormParts = null;
MainController.prototype.currentPart = null;
MainController.prototype.direction = null;

MainController.prototype.documentReady = function() {
	// Add keyboard listener.
	window.addEventListener('keydown', mainController.keyListener, true);
	// draw lines
	mainController.drawLines();
	mainController.wormParts = document.getElementsByClassName('worm-part');
	mainController.direction = 3;
	mainController.moveWorm = setInterval(
		mainController.animateParts, 100);
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
	for (var i = mainController.wormParts.length - 1; i >= 0; i--) {
		mainController.animateWormPart(mainController.wormParts[i]);
	};
}

MainController.prototype.animateWormPart = function(wormPart) {
	var coord = null;
	switch (mainController.direction) {
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
	var direction = null;
	switch (evt.keyCode) {
		// Left arrow.
		case 37:
			mainController.direction = 3;
			break;
			// Right arrow.
		case 39:
			mainController.direction = 1;
			break;
	}
}

function WormPart() {}

var mainController = new MainController();