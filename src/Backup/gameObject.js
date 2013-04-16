function GameObject(components) {
	this.components = components;
}

//update all the components
GameObject.prototype.update = function(){
	for(var x=0; x<this.components.length; x++) {
		this.components[x].update();
	}
}