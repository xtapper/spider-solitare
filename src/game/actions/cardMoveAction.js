function CardMoveAction(cards, sourceStack, destStack) {
	this.sourceStack = sourceStack;
	this.destStack = destStack;
	this.cards = cards;
	
	//add back the cards to the source stack since the player picked them up.
	//not doing causes doAction() to remove more cards than it should
	this.addToStack(this.sourceStack);
	
	Action.call(this);
}
CardMoveAction.prototype = new Action();
CardMoveAction.prototype.constructor = CardMoveAction;

CardMoveAction.prototype.doAction = function() {	
	
	this.sourceStack.removeTopCards(this.cards.length);
	this.addToStack(this.destStack);
	
	//flip card if necessary
	if(this.sourceStack.getTopCard() !== null && !this.sourceStack.getTopCard().isVisible)
		this.resultingActions.push(new CardFlipAction(this.sourceStack));
		
	if(this.destStack.checkForSet()) {
		this.resultingActions.push(new FinishedSetAction(this.destStack));
	}
	
	Action.prototype.doAction.call(this);	
}

CardMoveAction.prototype.undoAction = function() {
	Action.prototype.undoAction.call(this);
	
	this.addToStack(this.sourceStack);
	this.destStack.removeTopCards(this.cards.length);
}

CardMoveAction.prototype.addToStack = function(stack) {

	var cardIndex = 0;
	for(var i=0; i<this.cards.length; i++) {
		var card = this.cards[i];
		stack.putCard(card.definition, card.isVisible);		
	}
}