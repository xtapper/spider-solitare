function Input(engine) {

	this.engine = engine;

	this.keys = {};
	this.keyChanges = {};

	this.buttons= [0,0,0,0,0,0,0,0,0];
	this.lastButtons = [0,0,0,0,0,0,0,0,0];
	
	this.leftButton = 0;
	this.middleButton = 1;
	this.rightButton = 2;
	
	this.mouseX = 0;
	this.mouseY = 0;

	this.codes = {
		'Backspace': 8,
		'Tab': 9,
		'Enter': 13,
		'Shift': 16,
		'Ctrl': 17,
		'Alt': 18,
		'Pause': 19,
		'Capslock': 20,
		'Esc': 27,
		'Pageup': 33,
		'Pagedown': 34,
		'End': 35,
		'Home': 36,
		'Leftarrow': 37,
		'Uparrow': 38,
		'Rightarrow': 39,
		'Downarrow': 40,
		'Insert': 45,
		'Delete': 46,
		'0': 48,
		'1': 49,
		'2': 50,
		'3': 51,
		'4': 52,
		'5': 53,
		'6': 54,
		'7': 55,
		'8': 56,
		'9': 57,
		'a': 65,
		'b': 66,
		'c': 67,
		'd': 68,
		'e': 69,
		'f': 70,
		'g': 71,
		'h': 72,
		'i': 73,
		'j': 74,
		'k': 75,
		'l': 76,
		'm': 77,
		'n': 78,
		'o': 79,
		'p': 80,
		'q': 81,
		'r': 82,
		's': 83,
		't': 84,
		'u': 85,
		'v': 86,
		'w': 87,
		'x': 88,
		'y': 89,
		'z': 90,
		'0numpad': 96,
		'1numpad': 97,
		'2numpad': 98,
		'3numpad': 99,
		'4numpad': 100,
		'5numpad': 101,
		'6numpad': 102,
		'7numpad': 103,
		'8numpad': 104,
		'9numpad': 105,
		'Multiply': 106,
		'Plus': 107,
		'Minut': 109,
		'Dot': 110,
		'Slash1': 111,
		'F1': 112,
		'F2': 113,
		'F3': 114,
		'F4': 115,
		'F5': 116,
		'F6': 117,
		'F7': 118,
		'F8': 119,
		'F9': 120,
		'F10': 121,
		'F11': 122,
		'F12': 123,
		'equal': 187,
		'Coma': 188,
		'Slash': 191,
		'Backslash': 220
	}
}

Input.prototype.update = function(fnActOnInput) {
	
	//do the user provided input checking
	fnActOnInput.call(engine);
	
	this.updateKeyStates();
	this.updateMouseStates();
}


Input.prototype.updateKeyStates = function() {

	for(var key in this.keyChanges) {
		if(this.keyChanges[key]) {
			this.keys[key] = true; 
		}
		else
			this.keys[key] = false;	
	}
}
Input.prototype.updateMouseStates = function() {
	for(var i=0; i<this.buttons.length; i++) {
		this.lastButtons[i] = this.buttons[i];
	}
}

Input.prototype.getMouseX = function() {
	return this.mouseX;
}
Input.prototype.getMouseY = function() {
	return this.mouseY;
}

Input.prototype.isKeyDown = function(key) {
	var keyCode = this.codes[key];
	return this.keys[keyCode];
}
Input.prototype.isKeyPressed = function(key) {
	var keyCode = this.codes[key];
	
	return this.isKeyDown(keyCode) && 
	!this.keyChanges[keyCode];
}

Input.prototype.isButtonDown = function(button, borders) {
	
	return this.buttons[button] > 0 && this.isMouseInBorder(borders);
}
Input.prototype.isButtonPressed = function(button, borders) {
	return this.lastButtons[button] > 0 && this.buttons[button] == 0 && this.isMouseInBorder(borders);
}
Input.prototype.isMouseInBorder = function(borders) {

	if(borders === undefined) {
		return true;
	}
	
	if(borders.left   !== undefined && this.mouseX < borders.left)
		return false;
	if(borders.right  !== undefined && this.mouseX > borders.right)
		return false;
	if(borders.top    !== undefined && this.mouseY < borders.top)
		return false;
	if(borders.bottom !== undefined && this.mouseY > borders.bottom)
		return false;
		
	return true;
}

Input.prototype.isLeftButtonDown = function(borders) {
	return this.isButtonDown(this.leftButton, borders);
}
Input.prototype.isLeftButtonPressed = function() {
	return this.isButtonPressed(this.leftButton, borders);
}
Input.prototype.isRightButtonDown = function() {
	return this.isButtonDown(this.rightButton, borders);
}
Input.prototype.isRightButtonPressed = function() {
	return this.isButtonPressed(this.rightButton, borders);
}
Input.prototype.isMiddleButtonDown = function() {
	return this.isButtonDown(this.middleButton, borders);
}
Input.prototype.isMiddleButtonPressed = function() {
	return this.isButtonPressed(this.middleButton, borders);
}

Input.prototype.onkeydown = function(event) {
	this.keyChanges[event.keyCode] = true; //signal for add
}
Input.prototype.onkeyup = function(event) {
	this.keyChanges[event.keyCode] = false; //signal for remove
}

Input.prototype.onmousedown = function(event) {
	this.buttons[event.button]++;
}
Input.prototype.onmouseup= function(event) {
	this.buttons[event.button]--;
}
Input.prototype.onmousemove = function(event) {
	
	var coords = relMouseCoords.call(this.engine.canvas, event);
	this.mouseX = coords.x;
	this.mouseY = coords.y;
}

function relMouseCoords(event) {
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do{
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    }
    while(currentElement = currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    return {x:canvasX, y:canvasY}
}
