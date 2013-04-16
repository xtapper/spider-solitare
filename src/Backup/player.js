//Represents a player that plays the game

function Player(table, dealer) {

	this.cards = {};
	this.handDrawingOffset = {};
	this.isHoldingStack = false;
	
	//where cards were picked up from
	this.startStack = {};

	this.table = table;
	this.dealer = dealer;
}

Player.prototype.pickupStack = function(stack, mouseX, mouseY) {
	
	//can't pick up an empty stack
	if(!stack.hasCards())
		return;
		
	
	this.cards = this.dealer.pickupMovableCards(stack);
	this.startStack = stack;
	
	var stackIndex = this.table.stacks.indexOf(stack);
	var stackCoords = this.table.getTopCardBorders(stackIndex);
	this.handDrawingOffset = {x:mouseX - stackCoords.left, y:mouseY-(stackCoords.top)};
	this.isHoldingStack = true;
	
}

Player.prototype.dropStack = function(destStack) {
	this.dealer.addCardsToStack(this.cards, destStack, this.startStack);
	this.isHoldingStack = false;
}