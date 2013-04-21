function DealAction(dealer, table) {
	this.dealer = dealer;
	this.table = table;
	
	Action.call(this);
}
DealAction.prototype = new Action();
DealAction.prototype.constructor = DealAction;

DealAction.prototype.doAction = function() {

	var dealer = this.dealer;

	var targetStack = 0;
	//see if we're doing a partial deal
	this.numDealtCards = Math.min(dealer.dealPile.numCards(), dealer.gameConstants.numStacks);
	var numLeftToDeal = this.numDealtCards;
	
	while(numLeftToDeal > 0) {
		var card = dealer.dealPile.takeCard();
		this.table.stacks[targetStack].putCard(card.definition, true);
		
		targetStack++;		
		numLeftToDeal--;
	}
	
	//check for dealing completing a stack
	for(var i=0; i<this.table.stacks.length; i++) {
		if(this.table.stacks[i].checkForSet()) {
			this.resultingActions.push(new FinishedSetAction(this.table.stacks[i]));
		}
	}
	
	Action.prototype.doAction.call(this);
}

DealAction.prototype.undoAction = function() {
	Action.prototype.undoAction.call(this);
	
	var dealer = this.dealer;

	//start at stack# equal to the number of cards we dealt in case it wasn't a full deal
	var targetStack = this.numDealtCards-1;
	
	while(targetStack >= 0) {
		var card = this.table.stacks[targetStack].takeCard()
		dealer.dealPile.putCard(card.definition, false);
		
		targetStack--;	
	}
	
}

