function Table(game) {
	this.game = game;

	this.dealPile = {};
	this.stacks = [];	
		
	//positioning constants	
	this.left = 10;
	this.top = 10;	
	this.stackGap = 100; //horizontal space between stacks	
	this.hiddenCardGap = 10;  //vertical space between cards in stack
	this.visibleCardGap = 20; 
	
	this.cardImages = {};
	
	//this.suitTypes = ["hearts", "spades", "diamonds", "clubs"];
	//this.ranks = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];

	this.loadImages();	
	
	this.cardWidth = this.cardImages.back.width;
	this.cardHeight = this.cardImages.back.height;
}


//get the x,y boundaries of a certain stack
Table.prototype.getStackBorders = function(stackIndex) {
	
	var stack = this.stacks[stackIndex];
	var left = this.left + (this.stackGap * stackIndex);
	var top = this.top;
	
	return { left : left,
			 top : top,
			 right : left + this.cardWidth,
			 bottom : top + this.cardHeight + (Math.max(0,stack.numVisibleCards()-1) * this.visibleCardGap) + 
							((stack.cards.length-stack.numVisibleCards()) * this.hiddenCardGap)
			 };
}

//get the boundaries of the top card on the stack (not the entire stack)
Table.prototype.getTopCardBorders = function(stackIndex) {
	
	var stack = this.stacks[stackIndex];
		
	var borders = this.getStackBorders(stackIndex);
	
	var top = borders.bottom - this.cardHeight;
	
	return { left : borders.left,
			 top : top,
			 right : borders.right,
			 bottom : borders.bottom
			 };
}

//get the closest stack to this x-coordinate
Table.prototype.getClosestStack = function(x) {
	
	for(var i=0; i<this.stacks.length-1; i++) {
		var leftStackBorders = this.getStackBorders(i);
		var rightStackBorders = this.getStackBorders(i+1);
		
		var stackBoundary = leftStackBorders.right + (rightStackBorders.left - leftStackBorders.right) / 2;
		
		//x is to the left of the boundary, so it must be in this one
		//since we've checked all stacks to the left already
		if(x < stackBoundary)
			return this.stacks[i];
	}
	
	//must be in the last stack
	return this.stacks[this.stacks.length-1];
}

//is an x,y point over a stack
Table.prototype.isPointOverStack = function(x, y, stackIndex) {
	
}

Table.prototype.draw = function(context) {
	
	var x = this.left;
	
	for(var stackIndex=0; stackIndex<this.stacks.length; stackIndex++) {
		var stack = this.stacks[stackIndex];		
			
		var y = this.top;
		
		for(var cardIndex=0; cardIndex<stack.cards.length; cardIndex++) {
			var card = stack.cards[cardIndex];
			
			this.drawCard(context, card, x, y);
			
			if(card.isVisible) {
				y += this.visibleCardGap;
			}
			else {
				y += this.hiddenCardGap;
			}
		}		
		x += this.stackGap
	}	
}

Table.prototype.drawCard = function(context, card, x, y) {
	var image = null;
	if(card.isVisible) {
		image = this.cardImages[card.definition.suit[0] + card.definition.rank];
	}
	else {
		image = this.cardImages.back;
	}
	
	context.drawImage(image, x,y);
}

Table.prototype.loadImages = function() {
	for(var suitIndex=0; suitIndex<Card.suits.length; suitIndex++) {
		var suit = Card.suits[suitIndex];
		
		for(var rankIndex=0; rankIndex<Card.ranks.length; rankIndex++) {
			var rank = Card.ranks[rankIndex];
			
			var key = suit[0] + rank;
			this.cardImages[key] = new Image();
			this.cardImages[key].src = "images/" + key + ".png";
			
		}		
	}
	
	this.cardImages["back"] = new Image();
	this.cardImages["back"].src = "images/back.png";
}