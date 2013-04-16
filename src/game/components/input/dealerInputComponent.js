function DealerInputComponent() {

	GameComponent.call(this);
}

DealerInputComponent.prototype = new GameComponent();
DealerInputComponent.prototype.constructor = DealerInputComponent;

DealerInputComponent.prototype.update = function(context, input, dealer) {

	if(input.isLeftButtonPressed(
		{ 	left : dealer.formatter.dealPileX,
			right : dealer.formatter.dealPileX + dealer.formatter.cardWidth,
			top : dealer.formatter.dealPileY,
			bottom : dealer.formatter.dealPileY + dealer.formatter.cardHeight
		}
	) && dealer.dealPile.numCards() > 0) {
		//send deal message
		dealer.deal();
	}
}