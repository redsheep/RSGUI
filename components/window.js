
Window = function (game, x, y, width, height, text) {

	GUIContainer.call(this, game, x, y+32, width, height);

	this._text = text;
	this._title_height=32;
	this._radius=24;
	this._border=1;
	this._window_bg="rsgui-window-bg";
	this._window_title="rsgui-window-title";
	this.setAnchor(0.5,0.5);

	this.onShow =new Phaser.Signal();
	this.onClose=new Phaser.Signal();
};
Window.prototype = Object.create(GUIContainer.prototype);
Window.prototype.constructor = Window;
Window.prototype.drawCanvas=function(){
	//GUIContainer.prototype.draw.call(this);
	var w=this._originWidth;
	var h=this._originHeight;
	var th=this._title_height;
	var b=this._border;
	var r=this._radius;
	var fontcolor=this._font.color;
	var font=this.getFont();
	this._bmd.cls();
	this._bmd.ctx.lineWidth=b;
	this._bmd.ctx.strokeStyle = this._borderColor;
	if(this._focus){
		this._bmd.ctx.fillStyle= "#666";
	}else{
		this._bmd.ctx.fillStyle= "#999";
	}
	this._bmd.ctx.roundRect(b, b, w-2*b, th, 12, 'up');
	this._bmd.ctx.fill();
	this._bmd.ctx.strokeBorder(b);
	//this._bmd.draw(this._text, 12, 6, null, null, 'normal');
	//this._bmd.ctx.strokeStyle = "rgb(127, 127, 127)";
	this._bmd.ctx.fillStyle= this._color;
	this._bmd.ctx.roundRect(b, th, w-2*b, h-th-2*b, 12, 'down');
	this._bmd.ctx.fill();
	this._bmd.ctx.strokeBorder(b);
	this._bmd.ctx.fillStyle=fontcolor;
	this._bmd.ctx.font=font;
	this._bmd.ctx.textBaseline='middle';
	this._bmd.ctx.fillText(this._text, r+b, th/2);
}
Window.prototype.drawTexture=function(){
	this._bmd.cls();
	var w=this._originWidth;
	var h=this._originHeight;
	var th=this._title_height;
	var r=this._radius;
	var W=this.game.cache.getImage(this._window_bg).width;
	var H=this.game.cache.getImage(this._window_bg).height;
	this._bmd.generateNinePatchTexture(this._window_bg,0,th/2,w,h-th/2,r,W,H);
	var TW=this.game.cache.getImage(this._window_title).width;
	var TH=this.game.cache.getImage(this._window_title).height;
	var TX=this._width/2-TW/2;
	//this._titleBarbmd.copy(this._window_title,0,0,TW,TH,TX,0,TW,32);
	//this._bmd.ctx.globalCompositeOperation
	this._bmd.horizontalThreePatchTexture(this._window_title,0,0,
		w,th,TH,TW,TH);
	//this._bmd.draw(this._text, r, r, null, null, 'normal');
}
Window.prototype.addChild=function(object){
	GUIContainer.prototype.addChild.call(this,object);
	object.y+=this._title_height;
	object.x-=this._originWidth*this.anchor.x;
	object.y-=this._originHeight*this.anchor.y;
}
Window.prototype.removeChild=function(object){
	object.y-=this._title_height;
	object.x+=this._originWidth*this.anchor.x;
	object.y+=this._originHeight*this.anchor.y;
	GUIContainer.prototype.removeChild.call(this,object);
}
Window.prototype.show=function(){
	this.game.add.tween(this.scale).to( { x: 1.0, y:1.0 }, 2000, Phaser.Easing.Linear.None, true, 0);
	//this.game.add.tween(this).to( { alpha: 1.0 }, 2000, Phaser.Easing.Linear.None, true, 1000);
	this.onShow.dispatch();
}

Window.prototype.close=function(){
	//konwn issue, scale to zero will cause input handler error
	this.game.add.tween(this.scale).to( { x: 0.0001, y:0.0001 }, 2000, Phaser.Easing.Linear.None, true, 0);
	//this.game.add.tween(this).to( { alpha: 0.0 }, 2000, Phaser.Easing.Linear.None, true, 1000);
	this.onClose.dispatch();
}
Window.prototype.setFont=function(theme){
}
