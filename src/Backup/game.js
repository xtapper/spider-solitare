function SpiderGame(input, context) {

	this.input = input;
	this.context = context;

	this.table = {};
	this.dealer = {};
	this.player = {};
	
	//game constants
	this.numStacks = 8;
	this.numSuits = 2;
	this.numDecks = 8;
	this.initialStackHeight = 5;
	
	//card stacking & moving rules
	this.stackingRules = {order:StackingRule.descendingOrderSR};
	this.movingRules = {order:MovingRule.descendingOrder, suit:MovingRule.sameSuit};
	
	this.newGame();
	
}

SpiderGame.prototype.newGame = function() {

	this.suits = Card.suits.slice(0, this.numSuits);
	this.ranks = Card.ranks;
	
	this.table = new Table(this);
	this.dealer = new Dealer(this, this.table);
	this.player = new Player(this.table, this.dealer);
	
	this.dealer.dealNewGame();
}


SpiderGame.prototype.draw = function(context) {
	this.table.draw(context);	
	
	//draw player's stack
	if(this.player.isHoldingStack) {
		var x=this.input.getMouseX() - this.player.handDrawingOffset.x;
		var y=this.input.getMouseY() - this.player.handDrawingOffset.y;
		for(var i=0; i<this.player.cards.length; i++) {				
			this.table.drawCard(context, this.player.cards[i],x, y);
			y+=this.table.visibleCardGap;
		}
	}
}
