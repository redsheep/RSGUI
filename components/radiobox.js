
RadioBox = function (game, x, y, text) {
	GUIObject.call(this, game, x, y);

	this._seprate=2;
	this._text=text;
	this._check=false;
	this._onFrame = "rsgui-checkbox-on";
	this._offFrame = "rsgui-checkbox-off";
	this._frame=this._offFrame;
};
RadioBox.prototype = Object.create(GUIObject.prototype);
RadioBox.prototype.constructor = CheckBox;
RadioBox.prototype.drawCanvas=function(){
	var b=this._border;
	var r=this._radius;
	var w=this._originWidth;
	var h=this._originHeight;
	var c=h+this._seprate;
	var fontcolor=this._font.color;
	var font=this.getFont();
	this._bmd.cls();
	this._bmd.ctx.strokeStyle = this._borderColor;
	this._bmd.ctx.fillStyle= this._color;
	this._bmd.ctx.arc(h/2,h/2,h/3,0,2*Math.PI);
	this._bmd.ctx.fill();
	if(this._check){
		this._bmd.ctx.fillStyle= this._checkColor;
		this._bmd.ctx.beginPath();
		this._bmd.ctx.arc(h/2,h/2,h/5,0,2*Math.PI);
		this._bmd.ctx.closePath();
		this._bmd.ctx.fill();
	}
	this._bmd.ctx.font=font;
	this._bmd.ctx.fillStyle=fontcolor;
	this._bmd.ctx.textBaseline="middle"
	this._bmd.ctx.fillText(this._text, c, h/2);
}
RadioBox.prototype.drawTexture=function(){
	var b=this._border;
	var r=this._radius;
	var w=this._originWidth;
	var h=this._originHeight;
	var c=h+this._seprate;
	var fontcolor=this._font.color;
	var font=this.getFont();
	var W=this.game.cache.getImage(this._frame).width;
	var H=this.game.cache.getImage(this._frame).height;
	this._bmd.cls();
	this._bmd.copy(this._frame,0,0,W,H,0,0,h,h);
	this._bmd.ctx.fillStyle=fontcolor;
	this._bmd.ctx.font=font;
	this._bmd.ctx.textBaseline='top';
	this._bmd.ctx.fillText(this._text, c, r);
}
RadioBox.prototype.onInputDownHandler = function (sprite, pointer) {
	if(this._check) this.uncheck();
	else this.check();
	GUIObject.prototype.onInputDownHandler.call(this,sprite,pointer);
};
RadioBox.prototype.check=function(){
	this._check=true;
	this._frame=this._onFrame;
	if(this.parent!=null){
		for(i=0;i<this.parent.children.length;i++){
			var child=this.parent.children[i];
			if(child!=this && child.group==this.group){
				if(child.uncheck) child.uncheck();
			}
		}
	}
}
RadioBox.prototype.uncheck=function(){
	this._check=false;
	this._frame=this._offFrame;
}
RadioBox.prototype.resize=function(width,height){
	this._originHeight=height+this._extendHeight;
	this._originWidth=height+width+this._extendWidth;
	if(this._minWidth!=null && this._originWidth<this._minWidth)
		this._originWidth=this._minWidth;
	this._bmd.resize(this._originWidth,this._originHeight);
	this.onResize.dispatch();
}
RadioBox.prototype.setTheme=function(theme){
	GUIObject.prototype.setTheme.call(this,theme);
	this._checkColor=theme.check;
}
