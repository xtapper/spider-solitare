function CardFlipAction(stack) {
	this.stack = stack;
	
	Action.call(this);
}
CardFlipAction.prototype = new Action();
CardFlipAction.prototype.constructor = CardFlipAction;

CardFlipAction.prototype.doAction = function() {
	this.stack.flipTopCard();
}

CardFlipAction.prototype.undoAction = function() {
	this.stack.flipTopCard();	
}