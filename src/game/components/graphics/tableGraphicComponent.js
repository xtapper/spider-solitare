function TableGraphicComponent() {
		
	GameComponent.call(this);
}
TableGraphicComponent.prototype = new GameComponent();
TableGraphicComponent.prototype.constructor = TableGraphicComponent;

TableGraphicComponent.prototype.update = function(context, input, gameObject) {
	
	var stacks = gameObject.stacks;
	
	for(var i=0; i<stacks.length; i++) {
		stacks[i].draw(context);
	}	
}
