
ToggleButton = function (game, x, y) {

	GUIObject.call(this, game, x, y);
	this._minWidth=80;
	this._onFrame='rsgui-toggle-on';
	this._offFrame='rsgui-toggle-off';
	this._btnFrame='rsgui-toggle-btn';
	this._bgFrame='off';
	this._onColor='#ccc';
	this._offColor='#999';
	this._check=false;
};
ToggleButton.prototype = Object.create(GUIObject.prototype);
ToggleButton.prototype.constructor = ToggleButton;
ToggleButton.prototype.draw=function(){
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
	if(!this._hasTexture){
		this._bmd.ctx.fillStyle = this._color;
		this._bmd.ctx.roundRect(b, b, w-2*b, h-2*b, r, true);
		this._bmd.ctx.fill();
		this._bmd.ctx.strokeBorder(b);
	}else{
		var texture = this._texture[this._bgFrame];
		this._bmd.generateNinePatchTexture(texture.key,0,0,w,h,r,texture.width,texture.height);
	}
	//draw toggle text -on/-off
	this._bmd.ctx.font=font;
	this._bmd.ctx.fillStyle=fontcolor;
	this._bmd.ctx.textBaseline="top";
	this._bmd.ctx.fillText("on", r+b, r+b);
	this._bmd.ctx.fillText("off", w-r-b-16, r+b);
	//draw toggle button
	if(!this._hasTexture){
		this._bmd.ctx.fillStyle=this._bottonColor;
		if(this._check)this._bmd.ctx.roundRect(w-b-(h-2*b), b, h-2*b, h-2*b, r, true);
		else this._bmd.ctx.roundRect(b, b, h-2*b, h-2*b, r, true);
		this._bmd.ctx.fill();
		this._bmd.ctx.strokeBorder(b);
	}else{
		var texture = this._texture['btn'];
		if(this._check){
			this._bmd.generateNinePatchTexture(texture.key,w-b-(h-2*b), b, h-2*b, h-2*b,r,texture.width,texture.height);
		}else{
			this._bmd.generateNinePatchTexture(texture.key,b, b, h-2*b, h-2*b,r,texture.width,texture.height);
		}
	}
}
ToggleButton.prototype.onInputDownHandler = function (sprite, pointer) {
	if(this._check){
		this._check=false;
		this._bgFrame='off';
		this._color=this._offColor;
	}else{
		this._check=true;
		this._bgFrame='on';
		this._color=this._onColor;
	}
	GUIObject.prototype.onInputDownHandler.call(this,sprite,pointer);
};
ToggleButton.prototype.getType=function(){
	return 'toggle';
}
ToggleButton.prototype.setTheme=function(theme){
	GUIObject.prototype.setTheme.call(this,theme);
	this._bottonColor=theme.button;
	this._onColor=theme.toggle;
	this._offColor=theme.bgcolor;
}
ToggleButton.prototype.fit=function(){
	txtsize=getTextSize(this._font.family,this._font.size,'on  off');
	width = 2*this._radius+2*this._border+txtsize.width;
	height = 2*this._radius+2*this._border+txtsize.height;
	this.resize(parseInt(width),parseInt(height));
}
ToggleButton.prototype.getValue=function(){
	return this._check;
}
