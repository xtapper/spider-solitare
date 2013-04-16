function GameObject(graphicComponent, components) {
	this.components = components;
	this.graphicComponent = graphicComponent;
}

GameObject.prototype.draw = function(context, input) {
	this.graphicComponent.update(context, input, this);
}

//update all the components
GameObject.prototype.update = function(input){
	if(this.components !== null && this.components !== undefined) {
		for(var x=0; x<this.components.length; x++) {
			this.components[x].update(null, input, this);
		}
	}
}