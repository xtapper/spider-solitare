function Card(rank, suit) {
	GameObject.call(this);
	
	this.rank = rank;
	this.suit = suit;
	
	this.graphics = new ImageGraphicComponent();
	var key = suit[0] + rank;
	var imageName = "cards/" + key + ".png";
	this.graphics.image = engine.imageCache.getImage(imageName);
}
Card.prototype = new GameObject();
Card.prototype.constructor = Card;


Card.ranks = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
Card.suits = ["hearts", "spades", "diamonds", "clubs"];
