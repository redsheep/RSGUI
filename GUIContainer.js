//  Here is a custom game object
GUIContainer = function (game, x, y, width, height) {
	GUIObject.call(this, game,x,y,width,height);
	this._border=1;
	this._radius=10;
	this._padding=this._border+this._radius;
	this._childmask = new Phaser.Graphics(game, 0, 0);
	this._childmask.beginFill(0xffffff);
	var p=this._padding;
	this._childmask.drawRect(0,0,width,height);
	this.addChild(this._childmask);
	this._focusChild=null;
	this._downChild=null;
};
GUIContainer.prototype = Object.create(GUIObject.prototype);
GUIContainer.prototype.constructor = GUIContainer;
GUIContainer.prototype.update = function() {
	GUIObject.prototype.update.call(this);
	Phaser.Group.prototype.update.call(this);
	if(this.hitTest(this.game.input.mousePointer,this)){
		hitChild=this.getHitChild(this.game.input.mousePointer);
		if(this._focusChild!=hitChild){
			if(this._focusChild!=null)
				this._focusChild.onInputOutHandler(this._focusChild,this.game.input.mousePointer);
			if(hitChild!=null)
				hitChild.onInputOverHandler(hitChild,this.game.input.mousePointer);
		}
		this._focusChild=hitChild;
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
	this._downChild=this.getHitChild(pointer);
	if(this._downChild!=null){
		this._downChild.onInputDownHandler(this._downChild,pointer);
		this.input.disableDrag();
	}else {
		this.input.enableDrag();
	}
}
GUIContainer.prototype.onInputUpHandler=function(sprite,pointer){
	if(this._downChild!=null)
		this._downChild.onInputUpHandler(this._downChild,pointer);
	this._downChild=null;
}
GUIContainer.prototype.addChild=function(object){
	Phaser.Group.prototype.addChild.call(this,object);
	//object.y+=this._title_height;
  if(object!=this._childmask)
    object.mask=this._childmask;
  if(object.input!=null)
    object.input.enabled=true;
	object.x-=this._originWidth*this.anchor.x;
	object.y-=this._originHeight*this.anchor.y;
}
GUIContainer.prototype.removeChild=function(object){
	Phaser.Group.prototype.removeChild.call(this,object);
	object.y-=this._title_height;
  object.mask=this._mask;
}
GUIObject.prototype.setAnchor=function(x,y){
	this.anchor.x=x;this.anchor.y=y;
	this._childmask.x=-this._originWidth*this.anchor.x;
	this._childmask.y=-this._originHeight*this.anchor.y;
}
