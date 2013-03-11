function StackingRule(fnCanStack) {
	this.fnCanStack = fnCanStack;
}

StackingRule.prototype.canStack = function(baseCardDefinition, addedCardDefinition) {
	return fnCanStack(baseCardDefinition, addedCardDefinition);
}