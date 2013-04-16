function PlayerInputComponent() {

	GameComponent.call(this);
}

PlayerInputComponent.prototype = new GameComponent();
PlayerInputComponent.prototype.constructor = PlayerInputComponent;

PlayerInputComponent.prototype.update = function(context, input, player) {

	var formatter = window.engine.game.formatter;

	//undo/redo
	if(input.isLeftButtonPressed({left:formatter.undoX, top:formatter.undoY, 
		right:formatter.undoX + formatter.undoButtonWidth, bottom: formatter.undoY + formatter.undoButtonHeight}))
	{
		window.engine.game.actionStack.undo();
	}
	else if(input.isLeftButtonPressed({left:formatter.redoX, top:formatter.undoY, 
		right:formatter.redoX + formatter.undoButtonWidth, bottom: formatter.undoY + formatter.undoButtonHeight}))
	{
		window.engine.game.actionStack.redo();
	}
	
	//moving cards
	if(!player.isHoldingStack) {
		for(var i=0; i<player.table.stacks.length; i++) {
			var stack = player.table.stacks[i];
			
			if(input.isLeftButtonDown(this.getStackBorders(stack))) {
				player.pickupStack(stack, input.getMouseX(),
					input.getMouseY() - (this.getTopCardBorders(stack).top - this.getStackBorders(stack).top));
				break;
			}		
		}
	}
	else {
		if(!input.isLeftButtonDown()) {
			var destStack = this.getClosestStack(player.table.stacks, input.getMouseX());
			player.dropStack(destStack);
		}				
	}
}

//get the closest stack to this x-coordinate
PlayerInputComponent.prototype.getClosestStack = function(stacks, x) {
	var formatter = window.engine.game.formatter;
	for(var i=0; i<stacks.length-1; i++) {
		var leftStackBorder = stacks[i].x + formatter.cardWidth;
		var rightStackBorder = stacks[i+1].x;
		
		var stackBoundary = leftStackBorder + (rightStackBorder - leftStackBorder) / 2;
		
		//x is to the left of the boundary, so it must be in this one
		//since we've checked all stacks to the left already
		if(x < stackBoundary)
			return stacks[i];
	}
	
	//must be in the last stack
	return stacks[stacks.length-1];
}

PlayerInputComponent.prototype.getStackBorders = function(stack) {

	var formatter = window.engine.game.formatter;
	
	var left = stack.x;
	var top = stack.y;
	
	return { left : left,
			 top : top,
			 right : left + formatter.cardWidth,
			 bottom : top + formatter.cardHeight + (Math.max(0,stack.numVisibleCards()-1) * formatter.visibleCardGap) + 
							((stack.cards.length-stack.numVisibleCards()) * formatter.hiddenCardGap)
			 };
}

//get the boundaries of the top card on the stack (not the entire stack)
PlayerInputComponent.prototype.getTopCardBorders = function(stack) {
		
	var formatter = window.engine.game.formatter;
	var borders = this.getStackBorders(stack);
	
	var left = stack.x;
	var top = formatter.hiddenCardGap * (stack.numCards() - stack.numVisibleCards());
	
	return { left : left,
			 top : borders.bottom - (formatter.visibleCardGap * (stack.getNumMovableCards()-1)) - formatter.cardHeight,
			 right : left + formatter.cardWidth,
			 bottom : borders.bottom 
			 };
}