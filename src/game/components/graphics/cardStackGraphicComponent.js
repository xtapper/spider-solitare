function CardStackGraphicComponent() {
	
	
	GameComponent.call(this);
}
CardStackGraphicComponent.prototype = new GameComponent();
CardStackGraphicComponent.prototype.constructor = CardStackGraphicComponent;

CardStackGraphicComponent.prototype.update = function(context, input, gameObject) {	
	var cards = gameObject.cards;
	
	var x = gameObject.x;
	var y = gameObject.y;
	
	var backImage = window.engine.imageCache.getImage("cards/back.png");
		
	for(var cardIndex=0; cardIndex<cards.length; cardIndex++) {
		var card = cards[cardIndex];
		
		if(!card.isVisible) {
			image = backImage;
		}
		else {		
			var key = card.definition.suit[0] + card.definition.rank;
			var imageName = "cards/" + key + ".png";
			image = window.engine.imageCache.getImage(imageName);
		}
		context.drawImage(image, x,y);
		
		
		var formatter = window.engine.game.formatter;
		if(card.isVisible) {
			y += formatter.visibleCardGap;
		}
		else {
			y += formatter.hiddenCardGap;
		}	
	}
}
