function Formatter() {
	
	//positioning constants	
	this.left = 10;
	this.top = 120;	
	this.stackGap = 100; //horizontal space between stacks
	
	this.dealPileX = this.left;
	this.dealPileY = 10;
	
	var cardImage = new Image();
	var formatter = this;
	cardImage.onload = function() {
		formatter.cardWidth = cardImage.width;
		formatter.cardHeight = cardImage.height;
	}
	cardImage.src = window.imageLocation + "cards/back.png";
	
	
	
	//vertical space between cards in stack
	this.hiddenCardGap = 10;  
	this.visibleCardGap = 20; 
	
	//TODO: detect and size correctly depending on device
}