function CardStack(canAddToStack, canAddOnEmptyStack) {
	this.cards = [];
	this.stackingRules = {};
	this.numVisibleCards = 0;
	
	this.canAddToStack = canAddToStack;
	this.canAddOnEmptyStack = canAddOnEmptyStack;
}

CardStack.prototype.getTopCard = function() {
	if(this.cards.length == 0)
		return null;
	else
		return this.cards[this.cards.length-1];
}


CardStack.prototype.canStack = function(addedCardDefinition) {

	var baseCard = this.getTopCard()
	
	//do what the user wanted if the stack is empty
	if(baseCard == null)
		return this.canAddOnEmptyStack;
		
	//otherwise, make sure all stacking rules are satisfied
	for(var stackingRule in this.stackingRules) {
		if(!stackingRule(baseCard.definition, addedCardDefinition))
			return false;
	}
	
	return true;
}

CardStack.prototype.putCard = function(addedCardDefinition, isVisible) {
	this.cards.push({definition: addedCardDefinition, isVisible: isVisible});
	this.countVisibleCards();
}

CardStack.prototype.takeCard = function() {
	var card = this.cards.pop();	
	this.countVisibleCards();	
	return card;
}

CardStack.prototype.flipTopCard = function() {
	var top = this.getTopCard();
	top.isVisible = !top.isVisible;
	
	this.countVisibleCards();
}

CardStack.prototype.countVisibleCards = function() {
	var numVisible = 0;
	
	for(var i=0; i<this.cards.length; i++) {
		var card = this.cards[i];
		if(card.isVisible)
			numVisible++;
	}
	
	this.numVisibleCards = numVisible;
}

CardStack.prototype.shuffle = function() {

	//Fisher-Yates shuffle
	for(var i=this.cards.length-1; i >=0; i--) {
	
		var j = Math.floor(Math.random() * (i + 1));
		var temp = this.cards[i];
		this.cards[i] = this.cards[j];
		this.cards[j] = temp;
	}	   
}