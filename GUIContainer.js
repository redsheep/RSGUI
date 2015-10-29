//  Here is a custom game object
GUIContainer = function (game, x, y, width, height) {
	GUIObject.call(this, game,x,y,width,height);
	this._border=1;
	this._radius=10;
	this._originWith=width;
	this._originWith=height;
	this._padding=this._border+this._radius;
	this._childmask = new Phaser.Graphics(game, 0, 0);
	this._childmask.beginFill(0xffffff);
	this._childmask.drawRect(0,0,width,height);
	this._childmask.isMask = true;
	Phaser.Group.prototype.addChild.call(this,this._childmask);
	var p=this._padding;
	this._overChild=null;
	this._downChild=null;
	this._autofit=false;
	this.events.onInputOut.add(this.onInputOutHandler, this);
};
GUIContainer.prototype = Object.create(GUIObject.prototype);
GUIContainer.prototype.constructor = GUIContainer;
GUIContainer.prototype.update = function() {
	GUIObject.prototype.update.call(this);
	Phaser.Group.prototype.update.call(this);
	//if(this.children.length==0)
	if(this.hitTest(this.game.input.mousePointer,this)){
		hitChild=this.getHitChild(this.game.input.mousePointer);
		if(this._overChild!=hitChild){
			if(this._overChild!=null && this._overChild.events._onInputOut!=null)
				this._overChild.onInputOutHandler(this._overChild,this.game.input.mousePointer);
			if(hitChild!=null && hitChild.events._onInputOver!=null)
				hitChild.onInputOverHandler(hitChild,this.game.input.mousePointer);
		}
		this._overChild=hitChild;
	}
};
GUIContainer.prototype.getHitChild=function(pointer){
	if(this.hitTest(pointer,this)==false) return null;
	for(i=this.children.length-1;i>=0;i--){
		child = this.children[i];
		if(child.input!=null && child.input.enabled){
			if(this.hitTest(pointer,child)){
				return child;
			}
		}
	}
	return null;
}
GUIContainer.prototype.hitTest=function(point,sprite){
	m_left=sprite.world.x-sprite.anchor.x*sprite.width;
	m_right=sprite.world.x+(1-sprite.anchor.x)*sprite.width;
	m_top=sprite.world.y-sprite.anchor.y*sprite.height;
	m_bottom=sprite.world.y+(1-sprite.anchor.y)*sprite.height;
	if(point.x>m_left && point.x<m_right && point.y>m_top && point.y<m_bottom)
		return true;
	return false;
}
GUIContainer.prototype.fireAllChildEvent=function(event,pointer){
	for(i=this.children.length-1;i>=0;i--){
		child = this.children[i];
		if(child.input!=null && child.input.enabled){
			if(child[event]!=null){
				child[event](child, pointer);
			}
		}
	}
}
GUIContainer.prototype.onInputDownHandler=function(sprite,pointer){
	GUIObject.prototype.onInputDownHandler.call(this,sprite,pointer);
	this._downChild=this.getHitChild(pointer);
	if(this._downChild!=null){
		this._downChild.onInputDownHandler(this._downChild,pointer);
		if(this.input.draggable) this.input.isDragged=true;//disableDrag();
	}else {
		if(this.input.draggable) this.input.isDragged=false;
	}
}
GUIContainer.prototype.onInputUpHandler=function(sprite,pointer){
	GUIObject.prototype.onInputUpHandler.call(this,sprite,pointer);
	if(this._downChild!=null)
		this._downChild.onInputUpHandler(this._downChild,pointer);
	this._downChild=null;
}
GUIContainer.prototype.onInputOutHandler=function(sprite,pointer){
	GUIObject.prototype.onInputOutHandler.call(this,sprite,pointer);
	if(this._overChild!=null && this._overChild.events._onInputOut!=null)
		this._overChild.onInputOutHandler(this._overChild,pointer);
	this._overChild=null;
}
GUIContainer.prototype.addChild=function(object){
	Phaser.Group.prototype.addChild.call(this,object);
	object.mask=this._childmask;
}
GUIContainer.prototype.removeChild=function(object){
	if(object!=this._mask)
		Phaser.Group.prototype.removeChild.call(this,object);
}
GUIContainer.prototype.setAnchor=function(x,y){
	for(i=this.children.length-1;i>=0;i--){
		child = this.children[i];
		child.x+=this._originWidth*(this.anchor.x-x);
		child.y+=this._originHeight*(this.anchor.y-y);
	}
	this.anchor.x=x;this.anchor.y=y;
}
GUIContainer.prototype.removeAll=function(){
	for(i=this.children.length-1;i>=0;i--){
		child = this.children[i];
		this.removeChild(child);
	}
}
GUIContainer.prototype.resize=function(width,height){
	GUIObject.prototype.resize.call(this,width,height);
	this._childmask.clear();
	this._childmask.drawRect(0,0,width,height);
}