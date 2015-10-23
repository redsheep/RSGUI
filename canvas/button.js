//  Here is a custom game object
CustomizeButton = function (game, x, y,radius, border,text,theme) {

	var txtsize=getTextSize('Arial',16,text);
	var height=2*border+2*radius+txtsize.height;
	var width=2*border+2*radius+txtsize.width;
	GUIObject.call(this, game, x, y, width, height);
	this._text=text;
	this._border=border;
	this._radius=radius;
	this._theme=theme;
	this._upFrame='rsgui-button-up';
	this._downFrame='rsgui-button-down';
	this._frame=this._upFrame;
	//this._hasTexture=true;
	//this.width=width;
	//this.height=height;
};
CustomizeButton.prototype = Object.create(GUIObject.prototype);
CustomizeButton.prototype.constructor = CustomizeButton;
CustomizeButton.prototype.drawCanvas=function(){
	var b=this._border;
	var r=this._radius;
	var w=this._originWidth;
	var h=this._originHeight;
	this._bmd.cls();
	this._bmd.ctx.lineWidth=b;
	this._bmd.ctx.strokeStyle = "rgb(127, 127, 127)";
	if(this._state=='down'){
		this._bmd.ctx.fillStyle = "#333"
	}else{
		var my_gradient = this._bmd.ctx.createLinearGradient(0,0,0,50);
		my_gradient.addColorStop(0,"#ccc");
		my_gradient.addColorStop(1,"#333");
		this._bmd.ctx.fillStyle = my_gradient;
	}
	//x, y, width, height, radius, fill, stroke
	this._bmd.ctx.roundRect(b, b, w-2*b, h-2*b, r, true);
	this._bmd.ctx.fillStyle='#000';
	this._bmd.ctx.font='16px Arial';
	this._bmd.ctx.textBaseline='top';
	this._bmd.ctx.fillText(this._text, b+r, b+r);
};
CustomizeButton.prototype.setNinePatchTexture=function(up,down){
	this._upFrame=up;
	this._downFrame=down;
	this._hasTexture=true;
};
CustomizeButton.prototype.drawTexture=function(){
	this._bmd.cls();
	var w=this._originWidth;
	var h=this._originHeight;
	var r=this._radius;
	var W=this.game.cache.getImage(this._frame).width;
	var H=this.game.cache.getImage(this._frame).height;
	this._bmd.generateNinePatchTexture(this._frame,0,0,w,h,r,W,H);
	this._bmd.ctx.fillStyle='#000';
	this._bmd.ctx.font='16px Arial';
	this._bmd.ctx.textBaseline='top';
	this._bmd.ctx.fillText(this._text, r, r);
};
CustomizeButton.prototype.onInputDownHandler = function (sprite, pointer) {
	this._frame=this._downFrame;
	GUIObject.prototype.onInputDownHandler.call(this,sprite,pointer);
};
CustomizeButton.prototype.onInputUpHandler = function (sprite, pointer, isOver) {
	this._frame=this._upFrame;
	GUIObject.prototype.onInputUpHandler.call(this,sprite,pointer);
};
