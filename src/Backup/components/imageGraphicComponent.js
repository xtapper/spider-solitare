function ImageGraphicComponent() {
	GameComponent.call(this);
	
	this.x=0;
	this.y=0;
	this.image = {};
}

ImageGraphicComponent.prototype = new GameComponent();
ImageGraphicComponent.prototype.constructor = GraphicComponent;

ImageGraphicComponent.prototype.update = function(context) {
	context.drawImage(this.image, this.x, this.y);
}
