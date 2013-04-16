//Represents a dealer for the game
function Dealer(table, gameConstants) {
	this.table = table;
	this.gameConstants = gameConstants;
	this.formatter = window.engine.game.formatter;
	
	this.dealPile = new CardStack(this.formatter.dealPileX, this.formatter.dealPileY, false, false, false);
	
	this.graphics = new DealerGraphicComponent();	
	GameObject.call(this, this.graphics, [new DealerInputComponent()]);
}
Dealer.prototype = new GameObject();
Dealer.prototype.constructor = Dealer;

//Deal from pile onto each stack
Dealer.prototype.deal = function() {

	var targetStack = 0;
	var numLeftToDeal = Math.min(this.dealPile.numCards(), this.gameConstants.numStacks);
	
	while(numLeftToDeal > 0) {
		var card = this.dealPile.takeCard();
		this.table.stacks[targetStack].putCard(card.definition, true);
		
		targetStack++;		
		numLeftToDeal--;
	}
}

//remove all cards and deal a new game
Dealer.prototype.dealNewGame = function() {

	this.table.dealPile = new CardStack(false, false);
	this.table.stacks = [];	
	
	//constants
	var ranks = this.gameConstants.ranks;
	var suits = this.gameConstants.suits;
	var numStacks = this.gameConstants.numStacks;
	var numSuits = this.gameConstants.numSuits;
	var numDecks = this.gameConstants.numDecks;
	var initialStackHeight = this.gameConstants.initialStackHeight;
	
	var dealPile = this.dealPile;
	var stacks = this.table.stacks;
	
	//add all cards to dealer pile
	for(var deck=0; deck<numDecks; deck++) {
		
		//deal the correct amount of each suits
		var suitIndex = deck%suits.length;
		var suit = suits[suitIndex];
			
		for(var rankIndex=0; rankIndex<ranks.length; rankIndex++) {
			var rank = ranks[rankIndex];
			dealPile.putCard(new Card(rank, suit), false);
		}
	}
	
	dealPile.shuffle();
	
	var x=this.formatter.left;
	var y=this.formatter.top;
	//init stacks
	for(var i=0; i<numStacks; i++) {
		this.table.stacks[i] = new CardStack(x, y, true, true, false);
		this.table.stacks[i].stackingRules = this.gameConstants.stackingRules;
		this.table.stacks[i].movingRules = this.gameConstants.movingRules;
		x += this.formatter.stackGap;
		
	}
	
	//deal cards
	var targetStack = 0;
	var numLeftToDeal = initialStackHeight * numStacks;
	while(numLeftToDeal > 0) {
		var card = dealPile.takeCard();
		stacks[targetStack].putCard(card.definition, card.isVisible);
		
		targetStack = (targetStack + 1) % numStacks;
		
		numLeftToDeal--;
	}
	
	//flip top cards
	for(var i=0; i<numStacks; i++) {
		stacks[i].getTopCard().isVisible = true;
	}
}
/*
//try adding cards to a stack and handle failure if not able to
Dealer.prototype.addCardsToStack = function(cards, destStack, startStack) {

	//flip cards to make adding them easier
	cards.reverse();
	var targetStack = {};
	
	if(destStack.canStack(cards[cards.length-1].definition)) 
		targetStack = destStack;
	else
		targetStack = startStack;
		
	while(cards.length > 0) {
		var card = cards.pop();
		targetStack.putCard(card.definition, card.isVisible);
	}
}
*/