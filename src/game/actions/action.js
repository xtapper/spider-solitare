//represents something that can be done or un-done
function Action() {
	//actions that occur because this action occured
	this.resultingActions = [];
}


Action.prototype.doAction = function() {
	for(var i=0; i<this.resultingActions.length; i++) {
		this.resultingActions[i].doAction();
	}
}

Action.prototype.undoAction = function() {
	for(var i=this.resultingActions.length-1; i>=0; i--) {
		this.resultingActions[i].undoAction();
	}
	//clear resulting actions since doing the action will re-populate this
	this.resultingActions.length = 0;
}