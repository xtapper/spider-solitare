function DealAction(dealer, table) {
	this.dealer = dealer;
	this.table = table;
}
DealAction.prototype = new Action();
DealAction.prototype.constructor = DealAction;

DealAction.prototype.doAction = function() {

	var dealer = this.dealer;

	var targetStack = 0;
	var numLeftToDeal = Math.min(dealer.dealPile.numCards(), dealer.gameConstants.numStacks);
	
	while(numLeftToDeal > 0) {
		var card = dealer.dealPile.takeCard();
		this.table.stacks[targetStack].putCard(card.definition, true);
		
		targetStack++;		
		numLeftToDeal--;
	}
	
	Action.prototype.doAction.call(this);
}

DealAction.prototype.undoAction = function() {
	Action.prototype.undoAction.call(this);
	
	var dealer = this.dealer;

	var targetStack = dealer.gameConstants.numStacks-1;
	
	while(targetStack >= 0) {
		var card = this.table.stacks[targetStack].takeCard()
		dealer.dealPile.putCard(card.definition, false);
		
		targetStack--;	
	}
	
}

