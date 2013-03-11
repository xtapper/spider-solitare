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
	
	var ranks = this.table.ranks;
	var dealPile = this.table.dealPile;
	var stacks = this.table.stacks;
	
	//add all cards to dealer pile
	for(var deck=0; deck<this.game.numDecks; deck++) {
		
		//deal the correct amount of each suits
		var suitIndex = deck%this.game.suitTypes.length;
		var suit = this.game.suitTypes[suitIndex];
			
		for(var rankIndex=0; rankIndex<ranks.length; rankIndex++) {
			var rank = ranks[rankIndex];
			dealPile.putCard(new Card(rank, suit), false);
		}
	}
	
	dealPile.shuffle();
	
	//init stacks
	for(var i=0; i<this.game.numStacks; i++) {
		//TODO: add stacking rules
		this.table.stacks[i] = new CardStack();
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