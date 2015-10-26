//  Here is a custom game object
CheckBox = function (game, x, y, text) {
	this._seprate=2;
	this._text=text;
	//var txtsize=getTextSize('Arial',16,text);
	//var height=2*radius+txtsize.height;
	//var width=height+this._seprate+txtsize.width;
	GUIObject.call(this, game, x, y, width, height, text);

	//this._border=border;
	//this._radius=radius;
	this._check=false;
	this._onFrame = "rsgui-checkbox-on";
	this._offFrame = "rsgui-checkbox-off";
	this._frame=this._offFrame;
	this._hasTexture=true;
};
CheckBox.prototype = Object.create(GUIObject.prototype);
CheckBox.prototype.constructor = CheckBox;
CheckBox.prototype.drawCanvas=function(){
	var b=this._border;
	var r=this._radius;
	var w=this.width/this.scale.x;
	var h=this.height/this.scale.y;
	var c=h+this._seprate;
	this._bmd.cls();
	this._bmd.ctx.strokeStyle = "rgb(127, 127, 127)";
	this._bmd.ctx.fillStyle= "#000";
	this._bmd.ctx.roundRect(b, b, h-2*b, h-2*b, r, true);
	if(this._check){
		this._bmd.ctx.fillStyle= "#fff";
		this._bmd.ctx.roundRect(r, r, h-2*r, h-2*r, 1, true);
	}
	this._bmd.ctx.font="16px Arial";
	this._bmd.ctx.fillStyle="#fff";
	this._bmd.ctx.textBaseline="top"
	this._bmd.ctx.fillText(this._text, c, r);
}
CheckBox.prototype.drawTexture=function(){
	var b=this._border;
	var r=this._radius;
	var w=this.width/this.scale.x;
	var h=this.height/this.scale.y;
	var c=h+this._seprate;
	this._bmd.cls();
	var W=this.game.cache.getImage(this._frame).width;
	var H=this.game.cache.getImage(this._frame).height;
	this._bmd.copy(this._frame,0,0,W,H,0,0,h,h);
	this._bmd.ctx.font="16px Arial";
	this._bmd.ctx.fillStyle="#fff";
	this._bmd.ctx.textBaseline="top"
	this._bmd.ctx.fillText(this._text, c, r);
}
CheckBox.prototype.onInputDownHandler = function (sprite, pointer) {
	if(this._check){
		this._check=false;
		this._frame=this._offFrame;
	}else{
		this._check=true;
		this._frame=this._onFrame;
	}

	if (this.onInputDown)
	{
		this.onInputDown.dispatch(this, pointer);
	}
};
CheckBox.prototype.resize=function(width,height){
	this._originHeight=height+this._extendHeight;
	this._originWidth=height+width+this._extendWidth;
	if(this._minWidth!=null && this._originWidth<this._minWidth)
		this._originWidth=this._minWidth;
	this._bmd.resize(this._originWidth,this._originHeight);
	this.onResize.dispatch();
}
