function PlayerGraphicComponent() {

	this.handOffset = {};
	
	GameComponent.call(this);
}
PlayerGraphicComponent.prototype = new GameComponent();
PlayerGraphicComponent.prototype.constructor = PlayerGraphicComponent;

PlayerGraphicComponent.prototype.update = function(context, input, player) {

	if(player.isHoldingStack) {
		var x=input.getMouseX() - this.handOffset.x;
		var y=input.getMouseY() - this.handOffset.y;
		for(var i=0; i<player.cards.length; i++) {	

			var card = player.cards[i]
		
			var key = card.definition.suit[0] + card.definition.rank;
			var imageName = "cards/" + key + ".png";
			var image = window.engine.imageCache.getImage(imageName);
			
			context.drawImage(image, x, y);
			
			var formatter = window.engine.game.formatter;
			y += formatter.visibleCardGap;
		}		
	}	
}
