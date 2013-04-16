function SpiderGame() {

	this.table = {};
	this.dealer = {};
	this.player = {};
	
	this.formatter = new Formatter();
	
	
	//card stacking & moving rules
	this.stackingRules = {order:StackingRule.descendingOrder};
	this.movingRules = {order:MovingRule.descendingOrder, suit:MovingRule.sameSuit};	
}

SpiderGame.prototype.newGame = function() {

	var numSuits = 2;
	
	this.suits = Card.suits.slice(0, numSuits);
	this.ranks = Card.ranks;
	
	//game constants
	this.constants = { numStacks: 8, numSuits : numSuits, numDecks : 8, initialStackHeight : 5,
		suits : this.suits, ranks : this.ranks, stackingRules : this.stackingRules, movingRules : this.movingRules};
	
	this.table = new Table();
	this.dealer = new Dealer(this.table, this.constants);
	this.player = new Player(this.table);
	
	this.dealer.dealNewGame();
}


SpiderGame.prototype.update = function(input) {
	this.table.update(input);
	this.dealer.update(input);
	this.player.update(input);
}


SpiderGame.prototype.draw = function(context, input) {
	this.table.draw(context, input);
	this.dealer.draw(context, input);
	this.player.draw(context, input);
}
