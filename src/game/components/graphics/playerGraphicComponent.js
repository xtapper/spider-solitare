function PlayerGraphicComponent() {

	this.handOffset = {};
	
	GameComponent.call(this);
}
PlayerGraphicComponent.prototype = new GameComponent();
PlayerGraphicComponent.prototype.constructor = PlayerGraphicComponent;

PlayerGraphicComponent.prototype.update = function(context, input, player) {

	var imageCache = window.engine.imageCache;
	var formatter = window.engine.game.formatter;

	var undoImage = imageCache.getImage("undo.png");
	var redoImage = imageCache.getImage("redo.png");
	
	context.drawImage(undoImage, formatter.undoX, formatter.undoY);
	context.drawImage(redoImage, formatter.redoX, formatter.undoY);

	if(player.isHoldingStack) {
		var x=input.getMouseX() - this.handOffset.x;
		var y=input.getMouseY() - this.handOffset.y;
		for(var i=0; i<player.cards.length; i++) {	

			var card = player.cards[i]
		
			var key = card.definition.suit[0] + card.definition.rank;
			var imageName = "cards/" + key + ".png";
			var image = imageCache.getImage(imageName);
			
			context.drawImage(image, x, y);
			
			y += formatter.visibleCardGap;
		}		
	}	
}
