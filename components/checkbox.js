
CheckBox = function (game, x, y, text) {
	GUIObject.call(this, game, x, y);

	this._seprate=2;
	this._text=text;
	this._check=false;
	this._onFrame = "rsgui-checkbox-on";
	this._offFrame = "rsgui-checkbox-off";
	this._frame=this._offFrame;
};
CheckBox.prototype = Object.create(GUIObject.prototype);
CheckBox.prototype.constructor = CheckBox;
CheckBox.prototype.drawCanvas=function(){
	var b=this._border;
	var r=this._radius;
	var w=this.width/this.scale.x;
	var h=this.height/this.scale.y;
	var c=h+this._seprate;
	var fontcolor=this._font.color;
	var font=this.getFont();
	this._bmd.cls();
	//draw checkbox background
	this._bmd.ctx.strokeStyle = this._borderColor;
	this._bmd.ctx.fillStyle= this._color;
	this._bmd.ctx.roundRect(b+r, b+r, h-2*r-2*b, h-2*r-2*b, r, true);
	this._bmd.ctx.fill();
	//draw check on mark
	if(this._check){
		this._bmd.ctx.fillStyle= this._checkColor;
		this._bmd.ctx.beginPath();
		this._bmd.ctx.arc(h/2,h/2,h/4,0,2*Math.PI);
		this._bmd.ctx.closePath();
		this._bmd.ctx.fill();
	}
	//draw text
	this._bmd.ctx.font=font;
	this._bmd.ctx.fillStyle=fontcolor;
	this._bmd.ctx.textBaseline="middle"
	this._bmd.ctx.fillText(this._text, c, h/2);
}
CheckBox.prototype.drawTexture=function(){
	var b=this._border;
	var r=this._radius;
	var w=this.width/this.scale.x;
	var h=this.height/this.scale.y;
	var c=h+this._seprate;
	var fontcolor=this._font.color;
	var font=this.getFont();
	this._bmd.cls();
	var W=this.game.cache.getImage(this._frame).width;
	var H=this.game.cache.getImage(this._frame).height;
	this._bmd.copy(this._frame,0,0,W,H,0,0,h,h);
	this._bmd.ctx.font=font;
	this._bmd.ctx.fillStyle=fontcolor;
	this._bmd.ctx.textBaseline="top"
	this._bmd.ctx.fillText(this._text, c, r);
}
CheckBox.prototype.onInputDownHandler = function (sprite, pointer) {
	if(this._check) this.uncheck();
	else this.check();
	GUIObject.prototype.onInputDownHandler.call(this,sprite,pointer);
};
CheckBox.prototype.check=function(){
	this._check=true;
	this._frame=this._onFrame;
}
CheckBox.prototype.uncheck=function(){
	this._check=false;
	this._frame=this._offFrame;
}
CheckBox.prototype.resize=function(width,height){
	this._originHeight=height+this._extendHeight;
	this._originWidth=height+width+this._extendWidth;
	if(this._minWidth!=null && this._originWidth<this._minWidth)
		this._originWidth=this._minWidth;
	this._bmd.resize(this._originWidth,this._originHeight);
	this.onResize.dispatch();
}
CheckBox.prototype.setTheme=function(theme){
	GUIObject.prototype.setTheme.call(this,theme);
	this._checkColor=theme.check;
}
