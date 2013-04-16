function DealerGraphicComponent() {	
	GameComponent.call(this);
}
DealerGraphicComponent.prototype = new GameComponent();
DealerGraphicComponent.prototype.constructor = DealerGraphicComponent;

DealerGraphicComponent.prototype.update = function(context, input, gameObject) {
	
	var dealPile = gameObject.dealPile;	
	var dealer = gameObject;
	
	if(dealPile.numCards() > 0)
		context.drawImage(window.engine.imageCache.getImage("cards/back.png"), dealer.formatter.dealPileX, dealer.formatter.dealPileY);
}
