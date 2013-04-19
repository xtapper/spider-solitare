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

	if(cards === null || cards.length === 0)
		return;
		
	//don't create an action if moving these cards is invalid
	if(destStack == startStack ||
		!destStack.canStack(cards[0].definition)) {
		//flip cards to make adding them easier
		cards.reverse();
		
		//add them back to original stack
		while(cards.length > 0) {
			var card = cards.pop();
			startStack.putCard(card.definition, card.isVisible);
		}
	}
	else {
		//move cards
		var moveAction = new CardMoveAction(cards, startStack, destStack);
		window.engine.game.actionStack.doAction(moveAction);
	}
}