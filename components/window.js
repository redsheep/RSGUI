
Window = function (game, x, y, width, height, text) {

	GUIContainer.call(this, game, x, y+32, width, height);

	this._title = text;
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
Window.prototype.draw=function(){
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
	//draw background of window
	if(!this._hasTexture){
		this._bmd.ctx.fillStyle= this._color;
		this._bmd.ctx.roundRect(b, th, w-2*b, h-th-2*b, 12, 'down');
		this._bmd.ctx.fill();
		this._bmd.ctx.strokeBorder(b);
	}else{
		//draw with background texture
		var texture = this._texture['bg'];
		this._bmd.generateNinePatchTexture(texture.key,0,th/2,w,h-th/2,r,texture.width,texture.height);
	}
	//draw titlebar of window
	if(!this._hasTexture){
		if(this._focus){
			this._bmd.ctx.fillStyle= "#666";
		}else{
			this._bmd.ctx.fillStyle= "#999";
		}
		this._bmd.ctx.roundRect(b, b, w-2*b, th, 12, 'up');
		this._bmd.ctx.fill();
		this._bmd.ctx.strokeBorder(b);
	}else{
		//draw with titlebar texture
		var texture = this._texture['title'];
		var TX=this._width/2-texture.width/2;
		this._bmd.horizontalThreePatchTexture(texture.key,
			0,0,w,th,texture.height,texture.width,texture.height);
	}
	//draw title text
	this._bmd.ctx.fillStyle=fontcolor;
	this._bmd.ctx.font=font;
	this._bmd.ctx.textBaseline='middle';
	this._bmd.ctx.fillText(this._title, r+b, th/2);
}
Window.prototype.getType=function(){
	return 'window';
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
	this.onShow.dispatch(this);
}
Window.prototype.close=function(){
	//konwn issue, scale to zero will cause input handler error
	this.game.add.tween(this.scale).to( { x: 0.0001, y:0.0001 }, 2000, Phaser.Easing.Linear.None, true, 0);
	//this.game.add.tween(this).to( { alpha: 0.0 }, 2000, Phaser.Easing.Linear.None, true, 1000);
	this.onClose.dispatch(this);
}
Window.prototype.setTitle=function(title){
	this._title=title;
}
