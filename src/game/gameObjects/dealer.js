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

	var deal = new DealAction(this, this.table);
	window.engine.game.actionStack.doAction(deal);
}

//remove all cards and deal a new game
Dealer.prototype.dealNewGame = function() {

	this.table.dealPile = new CardStack(0,0,false, false, false);
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
	
	//dealPile.shuffle();
	
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
	var numLeftToDeal = Math.min(dealPile.numCards(), initialStackHeight * numStacks);
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
