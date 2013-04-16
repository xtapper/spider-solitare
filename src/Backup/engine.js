function Engine(canvas) {
	
	this.canvas = canvas;
	this.context = canvas.getContext("2d");
	this.imageCache = new ImageCache(this.context);
	this.input = new Input(this);
	
	this.game = new SpiderGame(this.input, this.context);
}

Engine.prototype.init = function() {

}

Engine.prototype.loop = function () {		
	
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	
	this.input.update(this.actOnInput);
	
	this.game.draw(this.context);
	
	
	//call loop again when browser is ready
	var self = this;
	window.requestAnimationFrame(function() {
		self.loop();
	});
}

//---------input-----------
Engine.prototype.actOnInput = function() {

	var table = this.game.table;

	//see if the player picked up a stack
	if(!this.game.player.isHoldingStack) {
		for(var stackIndex=0; stackIndex < table.stacks.length; stackIndex++) {
			var stack = table.stacks[stackIndex];
			if(this.input.isLeftButtonDown(table.getStackBorders(stackIndex))) {
				this.game.player.pickupStack(stack, this.input.getMouseX(), this.input.getMouseY());
			}
		}
	}
	else {
		//player just dropped the stack somewhere
		if(!this.input.isLeftButtonDown()) {
			var destStack = table.getClosestStack(this.input.getMouseX());
			this.game.player.dropStack(destStack);
		}
	}
}
