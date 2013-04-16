//Represents a player that plays the game
function Player(table) {

	this.table = table;
	
	this.cards = {};
	this.isHoldingStack = false;	
	//where cards were picked up from
	this.startStack = {};

	
	this.graphics = new PlayerGraphicComponent();
	GameObject.call(this, this.graphics, [new PlayerInputComponent()]);
}
Player.prototype = new GameObject();
Player.prototype.constructor = Player;




Player.prototype.pickupStack = function(stack, mouseX, mouseY) {
	
	//can't pick up an empty stack
	if(!stack.hasCards())
		return;
		
	//record stack pickup
	this.isHoldingStack = true;
	this.startStack = stack;
	this.graphics.handOffset = {x:mouseX - stack.x, y:mouseY-stack.y};
	this.cards = stack.popMovableCards();	
}

Player.prototype.dropStack = function(destStack) {
	this.addCardsToStack(this.cards, destStack, this.startStack);
	
	this.isHoldingStack = false;
	this.cards = null;
	this.startStack = null;
	this.graphics.handOffset = null;
}
Player.prototype.addCardsToStack = function(cards, destStack, startStack) {

	//flip cards to make adding them easier
	cards.reverse();
	var targetStack = {};
	
	//check if they can legally stack
	if(destStack.canStack(cards[cards.length-1].definition)) 
		targetStack = destStack;
	else
		targetStack = startStack;
		
	while(cards.length > 0) {
		var card = cards.pop();
		targetStack.putCard(card.definition, card.isVisible);
	}
}