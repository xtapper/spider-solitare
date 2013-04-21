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
	if(destStack == startStack) {
		this.returnCards();
	}	
	
	//check for partial stacks
	var partialStackIndex =0;
	while(partialStackIndex < this.cards.length) {
	
		if(destStack.canStack(cards[partialStackIndex].definition)) {		
			
			//return un-moved cards
			if(partialStackIndex > 0) {
				var unmoved = this.cards.slice(0, partialStackIndex);
				for(var i=0; i<partialStackIndex; i++) {
					startStack.putCard(this.cards[i].definition, this.cards[i].isVisible);
				}
			}
			
			//move cards
			var moveAction = new CardMoveAction(cards.slice(partialStackIndex), startStack, destStack);
			window.engine.game.actionStack.doAction(moveAction);	
			
			return;
		}
		
		partialStackIndex++;
	}
	
	
	this.returnCards();	
}

Player.prototype.returnCards = function() {
	this.cards.reverse();
	
	//add them back to original stack
	while(this.cards.length > 0) {
		var card = this.cards.pop();
		this.startStack.putCard(card.definition, card.isVisible);
	}		
}