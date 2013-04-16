function ImageCache(context) {
	this.context = context;
	this.images = {};
}

//get or load image if necessary
ImageCache.prototype.getImage = function(imageName) {
	if(imageName in this.images) {
		return this.images[imageName];
	}
	else {
		var newImage = new Image();
		newImage.src = window.imageLocation + imageName;
		
		this.images[imageName] = newImage;
		return newImage;
	}
}