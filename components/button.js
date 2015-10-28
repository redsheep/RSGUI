Button = function (game, x, y, text) {

	GUIObject.call(this, game, x, y);
	this._text=text;
	this._upFrame='rsgui-button-up';
	this._downFrame='rsgui-button-down';
	this._frame=this._upFrame;
	this._upColor='#ccc';
	this._downColor='#333';
};
Button.prototype = Object.create(GUIObject.prototype);
Button.prototype.constructor = Button;
Button.prototype.drawCanvas=function(){
	var b=this._border;
	var r=this._radius;
	var w=this._originWidth;
	var h=this._originHeight;
	var fontcolor=this._font.color;
	var font=this.getFont();
	this._bmd.cls();
	this._bmd.ctx.lineWidth=b;
	this._bmd.ctx.strokeStyle = this._borderColor;
	//draw button background
	if(this._state=='down'){
		this._bmd.ctx.fillStyle = this._downColor;
	}else{
		var my_gradient = this._bmd.ctx.createLinearGradient(0,0,0,50);
		my_gradient.addColorStop(0,this._upColor);
		my_gradient.addColorStop(1,this._downColor);
		this._bmd.ctx.fillStyle = my_gradient;
	}
	//draw button text
	this._bmd.ctx.roundRect(b, b, w-2*b, h-2*b, r, true);
	this._bmd.ctx.fill();
	this._bmd.ctx.strokeBorder(b);
	this._bmd.ctx.fillStyle=fontcolor;
	this._bmd.ctx.font=font;
	this._bmd.ctx.textBaseline='top';
	this._bmd.ctx.fillText(this._text, b+r, b+r);
};
Button.prototype.drawTexture=function(){
	this._bmd.cls();
	var w=this._originWidth;
	var h=this._originHeight;
	var r=this._radius;
	var W=this.game.cache.getImage(this._frame).width;
	var H=this.game.cache.getImage(this._frame).height;
	var fontcolor=this._font.color;
	var font=this.getFont();
	this._bmd.generateNinePatchTexture(this._frame,0,0,w,h,r,W,H);
	this._bmd.ctx.fillStyle=fontcolor;
	this._bmd.ctx.font=font;
	this._bmd.ctx.textBaseline='top';
	this._bmd.ctx.fillText(this._text, r, r);
};
Button.prototype.onInputDownHandler = function (sprite, pointer) {
	this._frame=this._downFrame;
	GUIObject.prototype.onInputDownHandler.call(this,sprite,pointer);
};
Button.prototype.onInputUpHandler = function (sprite, pointer, isOver) {
	this._frame=this._upFrame;
	GUIObject.prototype.onInputUpHandler.call(this,sprite,pointer);
};
Button.prototype.setTheme=function(theme){
	GUIObject.prototype.setTheme.call(this,theme);
	this._upColor=theme.up;
	this._downColor=theme.down;
}
