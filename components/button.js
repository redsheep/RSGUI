Button = function (game, x, y, text) {

	GUIObject.call(this, game, x, y);
	this._text=text;
	this._upFrame='rsgui-button-up';
	this._downFrame='rsgui-button-down';
	this._frame='up';
	this._upColor='#ececec';
	this._downColor='#d5d5d5';
	this.onClick=new Phaser.Signal();
};
Button.prototype = Object.create(GUIObject.prototype);
Button.prototype.constructor = Button;
Button.prototype.draw=function(){
	var b=this._border;
	var r=this._radius;
	var w=this._originWidth;
	var h=this._originHeight;
	var fontcolor=this._font.color;
	var font=this.getFont();
	//var texture=this.game.cache.checkImageKey(this._frame);
	this._bmd.cls();
	this._bmd.ctx.lineWidth=b;
	this._bmd.ctx.strokeStyle = this._borderColor;
	//draw button background
	if(!this._hasTexture){// && texture){
		this._bmd.ctx.globalCompositeOperation = "multiply";
		if(this._state=='down'){
			this._bmd.ctx.fillStyle = this._downColor;
		}else{
			var my_gradient = this._bmd.ctx.createLinearGradient(0,0,0,50);
			my_gradient.addColorStop(0,this._upColor);
			my_gradient.addColorStop(1,this._downColor);
			this._bmd.ctx.fillStyle = my_gradient;
		}
		this._bmd.ctx.roundRect(b, b, w-2*b, h-2*b, r, true);
		this._bmd.ctx.fill();
		this._bmd.ctx.fillStyle = this._color;
		this._bmd.ctx.roundRect(b, b, w-2*b, h-2*b, r, true);
		this._bmd.ctx.fill();
		this._bmd.ctx.strokeBorder(b);
	}else{
		var texture = this._texture[this._frame];
		this._bmd.generateNinePatchTexture(texture.key,0,0,w,h,r,texture.width,texture.height);
	}
	//draw button text
	this._bmd.ctx.fillStyle=fontcolor;
	this._bmd.ctx.font=font;
	this._bmd.ctx.textBaseline='top';
	this._bmd.ctx.fillText(this._text, b+r, b+r);
};
Button.prototype.getType=function(){
	return 'button';
}
Button.prototype.onInputDownHandler = function (sprite, pointer) {
	this._frame='down';
	GUIObject.prototype.onInputDownHandler.call(this,sprite,pointer);
};
Button.prototype.onInputUpHandler = function (sprite, pointer, isOver) {
	this._frame='up';
	GUIObject.prototype.onInputUpHandler.call(this,sprite,pointer);
	if(isOver) this.onClick.dispatch(pointer,this);
};
Button.prototype.setTheme=function(theme){
	GUIObject.prototype.setTheme.call(this,theme);
}
Button.prototype.setText=function(text){
	this._text=text;
	this.fit();
}
