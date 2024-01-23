let start;
let game;
let renderer;
let keysPressed;

function mainLoop(timeStamp) {
	if (start === undefined) {
		this.game.update(this.game, this.keysPressed);
		this.renderer.draw(this.game);
	  	start = timeStamp;
	}
	const elapsed = timeStamp - start;
	if (elapsed > 50) {
		this.game.update(this.game, this.keysPressed);
		this.renderer.draw(this.game);
		start = timeStamp;
	}
	window.requestAnimationFrame(mainLoop);
}

function init() {
	this.keysPressed = new Set();
	this.game = new ShipsGame();
	this.renderer = new CanvasDrawRenderer();
	document.addEventListener("keydown", (keyEvent) => {
		this.keysPressed.add(keyEvent.code) 
	});
	document.addEventListener("keyup", (keyEvent) => {
		this.keysPressed.delete(keyEvent.code)
	});
	this.mainLoop();
}