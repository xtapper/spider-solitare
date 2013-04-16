function MovingRule(fnCanMove) {
	this.fnCanMove = fnCanMove;
}

MovingRule.prototype.canMoveTogether = function(baseCardDefinition, topCardDefinition) {
	return this.fnCanMove(baseCardDefinition, topCardDefinition);
}


MovingRule.sameSuit = new MovingRule(
	function(base, top)
	{
		return (base.suit === top.suit);
	}
);

MovingRule.descendingOrder = new MovingRule(
	function(base, added)
	{
		var baseIndex =  Card.ranks.indexOf(base.rank);
		var addedIndex =  Card.ranks.indexOf(added.rank);
		
		return (baseIndex-1) === addedIndex;
	}
);