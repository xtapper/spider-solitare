function ActionStack() {
	this.doneActions = [];
	this.undoneActions = [];
}


ActionStack.prototype.doAction = function(action) {
		this.doneActions.push(action);
		action.doAction();
		this.undoneActions = [];
}

ActionStack.prototype.undo = function() {

	if(this.doneActions.length > 0) {
		var action = this.doneActions.pop();
		this.undoneActions.push(action);
		action.undoAction();
	}
}
ActionStack.prototype.redo = function() {
	
	if(this.undoneActions.length > 0) {
		var action = this.undoneActions.pop();
		this.doneActions.push(action);
		action.doAction();
	}
}