//represents something that can be done or un-done
function Action() {
	//actions that occur because this action occured
	this.resultingActions = [];
}


Action.prototype.doAction = function() {
	for(var i=0; i<this.resultingActions.length; i++) {
		resultingAction.doAction();
	}
}

Action.prototype.undoAction = function() {
	for(var i=this.resultingActions.length-1; i>=0; i++) {
		resultingAction.undoAction();
	}
}