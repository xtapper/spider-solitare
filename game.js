function SpiderGame() {
	
	//game constants
	this.numStacks = 8;
	this.numSuits = 2;
	this.numDecks = 8;
	this.initialStackHeight = 5;
	
	this.newGame();
	
}

SpiderGame.prototype.newGame = function() {

	this.suitTypes = ["hearts", "spades", "diamonds", "clubs"].slice(0, this.numSuits);
	this.ranks = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];		
	
	this.table = new Table(this);
	this.dealer = new Dealer(this, this.table);
	this.player = new Player(this.table, this.dealer);
	
	this.dealer.dealNewGame();
}


SpiderGame.prototype.draw = function(context) {
	this.table.draw(context);	
}
