function Engine(canvas) {
	
	this.canvas = canvas;
	this.context = canvas.getContext("2d");
	
	this.game = new SpiderGame();
	
	
	this.input = new Input(this);
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

	//for(var stackIndex=0; stackIndex < this.game.stacks.length; stackIndex++) {
	//	var stack = this.game.stacks[stackIndex];
	//	if(this.input.isLeftButtonDown(this.game.getStackBorders(stackIndex))) {
			//this.game.hand = stack;
			//this.game.handDrawingOffset
	//	}
	//}
}
