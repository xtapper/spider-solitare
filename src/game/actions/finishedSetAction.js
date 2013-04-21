function FinishedSetAction(stack) {
	this.stack = stack;
	
	Action.call(this);
}
FinishedSetAction.prototype = new Action();
FinishedSetAction.prototype.constructor = FinishedSetAction;


FinishedSetAction.prototype.doAction = function() {
	this.cards = this.stack.popMovableCards();

	this.resultingActions.push(new CardFlipAction(this.stack));
	
	Action.prototype.doAction.call(this);
}

FinishedSetAction.prototype.undoAction = function() {
	Action.prototype.undoAction.call(this);
	
	for(var i=0; i<this.cards.length; i++) {
		this.stack.putCard(this.cards[i].definition, this.cards[i].isVisible);
	}
}
