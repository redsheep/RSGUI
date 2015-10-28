
ToggleButton = function (game, x, y) {

	GUIObject.call(this, game, x, y);
	this._text="";
	this._minWidth=80;
	this._onFrame='rsgui-toggle-on';
	this._offFrame='rsgui-toggle-off';
	this._btnFrame='rsgui-toggle-btn';
	this._bgFrame=this._offFrame;
	this._onColor='#ccc';
	this._offColor='#999';
	this._check=false;
};
ToggleButton.prototype = Object.create(GUIObject.prototype);
ToggleButton.prototype.constructor = ToggleButton;
ToggleButton.prototype.drawCanvas=function(){
	var b=this._border;
	var r=this._radius;
	var w=this._originWidth;
	var h=this._originHeight;
	var fontcolor=this._font.color;
	var font=this.getFont();
	this._bmd.cls();
	this._bmd.ctx.lineWidth=b;
	this._bmd.ctx.strokeStyle = this._borderColor;
	//draw background
	this._bmd.ctx.fillStyle = this._color;
	this._bmd.ctx.roundRect(b, b, w-2*b, h-2*b, r, true);
	this._bmd.ctx.fill();
	this._bmd.ctx.strokeBorder(b);
	//draw toggle text -on/-off
	this._bmd.ctx.font=font;
	this._bmd.ctx.fillStyle=fontcolor;
	this._bmd.ctx.textBaseline="top";
	this._bmd.ctx.fillText("on", r+b, r+b);
	this._bmd.ctx.fillText("off", w-r-b-16, r+b);
	//draw toggle button
	this._bmd.ctx.fillStyle=this._bottonColor;
	if(this._check)this._bmd.ctx.roundRect(w-b-(h-2*b), b, h-2*b, h-2*b, r, true);
	else this._bmd.ctx.roundRect(b, b, h-2*b, h-2*b, r, true);
	this._bmd.ctx.fill();
	this._bmd.ctx.strokeBorder(b);
}
ToggleButton.prototype.drawTexture=function(){
	var b=this._border;
	var r=this._radius;
	var w=this._originWidth;
	var h=this._originHeight;
	var fontcolor=this._font.color;
	var font=this.getFont();
	var W=this.game.cache.getImage(this._bgFrame).width;
	var H=this.game.cache.getImage(this._bgFrame).height;
	var fontcolor=this._font.color;
	var font=this.getFont();
	//draw toggle text -on/-off
	this._bmd.cls();
	this._bmd.generateNinePatchTexture(this._bgFrame,0,0,w,h,r,W,H);
	this._bmd.ctx.font=font;
	this._bmd.ctx.fillStyle=fontcolor;
	this._bmd.ctx.textBaseline="top"
	this._bmd.ctx.fillText("on", r+b, r+b);
	this._bmd.ctx.fillText("off", w-r-b-16, r+b);
	//draw background
	this._bmd.ctx.fillStyle=this._bottonColor;
	var W=this.game.cache.getImage(this._btnFrame).width;
	var H=this.game.cache.getImage(this._btnFrame).height;
	if(this._check){
		this._bmd.generateNinePatchTexture(this._btnFrame,w-b-(h-2*b), b, h-2*b, h-2*b,r,W,H);
	}else{
		this._bmd.generateNinePatchTexture(this._btnFrame,b, b, h-2*b, h-2*b,r,W,H);
	}
}
ToggleButton.prototype.onInputDownHandler = function (sprite, pointer) {
	if(this._check){
		this._check=false;
		this._bgFrame=this._offFrame;
		this._color=this._offColor;
	}else{
		this._check=true;
		this._bgFrame=this._onFrame;
		this._color=this._onColor;
	}
	GUIObject.prototype.onInputDownHandler.call(this,sprite,pointer);
};
ToggleButton.prototype.setTheme=function(theme){
	GUIObject.prototype.setTheme.call(this,theme);
	this._bottonColor=theme.button;
	this._onColor=theme.toggle;
	this._offColor=theme.bgcolor;
}
