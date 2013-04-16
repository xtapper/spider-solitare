function Table() {

	this.stacks = [];			
	
	this.graphics = new TableGraphicComponent();
	GameObject.call(this, this.graphics);
}

Table.prototype = new GameObject();
Table.prototype.constructor = Table;
