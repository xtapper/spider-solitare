//canAddToStack - can the user add cards to this stack
//canAddOnEmptyStack - can the user add cards to an empty stack (0 cards)
//canAddOnFlippedCards - can the user add cards to the stack if the top card is flipped (face down)
function CardStack(x,y, formatter,canAddToStack, canAddOnEmptyStack, canAddOnFlippedCards) {
	this.cards = [];
	this.stackingRules = {};
	this.movingRules = {};
	
	this.x=x;
	this.y=y;
	this.formatter = formatter;
	
	this.canAddToStack = canAddToStack;
	this.canAddOnEmptyStack = canAddOnEmptyStack;
	this.canAddOnFlippedCards = canAddOnFlippedCards;
	
	this.graphics = new CardStackGraphicComponent(this.cards);
	
	
	//tell parent about components
	GameObject.call(this, this.graphics);
}
CardStack.prototype = new GameObject();
CardStack.prototype.constructor = CardStack;

CardStack.prototype.numCards = function() {
	if(this.cards === null)
		return 0;
	return this.cards.length;
}

CardStack.prototype.getTopCard = function() {
	if(this.cards.length == 0)
		return null;
	else
		return this.cards[this.cards.length-1];
}

CardStack.prototype.getNumMovableCards = function() {

	if(this.cards.length <= 1)
		return this.cards.length;

	var numMovableCards = 1;
	var cardIndex = this.cards.length-2;
	var topCard = this.getTopCard();
	var bottomCard = this.cards[cardIndex];
	
	while(cardIndex >=1 && this.canMoveTogether(bottomCard.definition, topCard.definition) && topCard.isVisible) {
			
		cardIndex--;
		if(cardIndex == 0)
			break;
			
		numMovableCards++;
		topCard = bottomCard;	
		bottomCard = this.cards[cardIndex];
	}
	return numMovableCards;
}

//Get top cards that move together
CardStack.prototype.popMovableCards = function() {

	if(this.cards.length == 0)
		return null;

	var movableCards = [];
	var lastCard = this.takeCard();
	movableCards.push(lastCard);
	
	while(this.hasCards() && this.canMoveTogether(this.getTopCard().definition, lastCard.definition) && this.getTopCard().isVisible) {
		lastCard = this.takeCard();
		movableCards.push(lastCard);
	}
	
	movableCards.reverse();
	return movableCards;
	
}

CardStack.prototype.hasCards = function() {
	return this.cards.length > 0;
}

//Can this card stack legally on top of this stack
CardStack.prototype.canStack = function(addedCardDefinition) {

	var baseCard = this.getTopCard()
	
	//do what the user wanted if the stack is empty
	if(baseCard == null)
		return this.canAddOnEmptyStack;
		
	//otherwise, make sure all stacking rules are satisfied
	for(var stackingRuleIndex in this.stackingRules) {
		var stackingRule = this.stackingRules[stackingRuleIndex];
		if(!stackingRule.canStack(baseCard.definition, addedCardDefinition))
			return false;
	}
	
	return true;
}

//can these 2 cards move together
CardStack.prototype.canMoveTogether = function(baseCardDefinition, topCardDefinition) {

	
	//we can always move if there's 1 card left
	if(baseCardDefinition == null)
		return true;
		
	for(var movingRuleIndex in this.movingRules) {
		var movingRule = this.movingRules[movingRuleIndex];
		if(!movingRule.canMoveTogether(baseCardDefinition, topCardDefinition))
			return false;
	}
	
	return true;
}

CardStack.prototype.putCard = function(addedCardDefinition, isVisible) {
	this.cards.push({definition: addedCardDefinition, isVisible: isVisible});
}

CardStack.prototype.takeCard = function() {
	var card = this.cards.pop();	
	return card;
}

CardStack.prototype.flipTopCard = function() {
	var top = this.getTopCard();
	top.isVisible = !top.isVisible;
}


CardStack.prototype.numVisibleCards = function() {
	var numVisible = 0;
	
	for(var i=0; i<this.cards.length; i++) {
		var card = this.cards[i];
		if(card.isVisible)
			numVisible++;
	}
	
	return numVisible;
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