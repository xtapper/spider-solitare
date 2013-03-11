//Represents a player that plays the game

function Player(table, dealer) {
	this.table = table;
	this.dealer = dealer;
	
	
}

Player.prototype.pickupStack = function(stack, mouseX, mouseY) {
	this.hand = stack
	var stackCoords = this.getStackBorders(this.stacks.indexOf(stack));
	this.handDrawingOffset = {x:mouseX - stackCoords.left, y:mouseY-stackCoords.top};
}