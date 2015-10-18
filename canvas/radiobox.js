//  Here is a custom game object
RadioBox = function (game, x, y, radius, border, text) {
	this._box=24;
	this._seprate=2;
	this._text=text;
	var txtsize=getTextSize('Arial',16,text);
	var height=2*radius+txtsize.height;
	var width=height+this._seprate+txtsize.width;
	GUIObject.call(this, game, x, y, width, height, text);

	this._border=border;
	this._radius=radius;
	this._check=false;
	this._onFrame = "rsgui-check-on";
	this._offFrame = "rsgui-check-off";
	this._frame=this._offFrame;
	this._hasTexture=true;
};
RadioBox.prototype = Object.create(GUIObject.prototype);
RadioBox.prototype.constructor = CheckBox;
RadioBox.prototype.drawCanvas=function(){
	var b=this._border;
	var r=this._radius;
	var w=this._originWidth;
	var h=this._originHeight;
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
RadioBox.prototype.drawTexture=function(){
	var b=this._border;
	var r=this._radius;
	var w=this._originWidth;
	var h=this._originHeight;
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
				child.uncheck();
			}
		}
	}
}
RadioBox.prototype.uncheck=function(){
	this._check=false;
	this._frame=this._offFrame;
}
