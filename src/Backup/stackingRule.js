function StackingRule(fnCanStack) {
	this.fnCanStack = fnCanStack;
}

StackingRule.prototype.canStack = function(baseCardDefinition, addedCardDefinition) {
	return this.fnCanStack(baseCardDefinition, addedCardDefinition);
}

StackingRule.descendingOrder = new StackingRule(
	function(base, added)
	{
		var baseIndex =  Card.ranks.indexOf(base.rank);
		var addedIndex =  Card.ranks.indexOf(added.rank);
		
		return (baseIndex-1) === addedIndex;
	}
);
