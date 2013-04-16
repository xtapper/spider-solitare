//Represents a dealer for the game
function Dealer(game, table) {
	this.table = table;
	this.game = game;
}

//Deal from pile onto each stack
Dealer.prototype.deal = function() {
}

//remove all cards and deal a new game
Dealer.prototype.dealNewGame = function() {

	this.table.dealPile = new CardStack(false, false);
	this.table.stacks = [];	
	
	var ranks = this.game.ranks;
	var suits = this.game.suits;
	var dealPile = this.table.dealPile;
	var stacks = this.table.stacks;
	
	//add all cards to dealer pile
	for(var deck=0; deck<this.game.numDecks; deck++) {
		
		//deal the correct amount of each suits
		var suitIndex = deck%suits.length;
		var suit = suits[suitIndex];
			
		for(var rankIndex=0; rankIndex<ranks.length; rankIndex++) {
			var rank = ranks[rankIndex];
			dealPile.putCard(new Card(rank, suit), false);
		}
	}
	
	dealPile.shuffle();
	
	//init stacks
	for(var i=0; i<this.game.numStacks; i++) {
		this.table.stacks[i] = new CardStack(true, true, false);
		this.table.stacks[i].stackingRules = this.game.stackingRules;
		this.table.stacks[i].movingRules = this.game.movingRules;
		
	}
	
	//deal cards
	var targetStack = 0;
	var numLeftToDeal = this.game.initialStackHeight * this.game.numStacks;
	while(numLeftToDeal > 0) {
		var card = dealPile.takeCard();
		stacks[targetStack].putCard(card.definition, card.isVisible);
		
		targetStack = (targetStack + 1) % this.game.numStacks;
		
		numLeftToDeal--;
	}
	
	//flip top cards
	for(var i=0; i<this.game.numStacks; i++) {
		stacks[i].getTopCard().isVisible = true;
	}
}

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

//pickup the movable cards from this stack and return them
Dealer.prototype.pickupMovableCards = function(stack) {
	return stack.popMovableCards();
}