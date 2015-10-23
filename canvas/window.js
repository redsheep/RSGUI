//  Here is a custom game object
Window = function (game, x, y, width, height, text) {

	this._text = text;//new Phaser.Text(game, 0, 0, text, { font: "bold 16px Arial", fill: "#000"});

	GUIContainer.call(this, game, x, y+32, width, height);

	//this._titleBarbmd = new Phaser.BitmapData(game, '', width, 32);
	//this._titleBar = game.add.sprite(x,y,this._titleBarbmd);
	//this._panel = game.add.sprite(x,y+32,this._bmd);

	this._title_height=32;
	this._radius=24;
	this._border=1;
	this._window_bg="rsgui-window-bg";
	this._window_title="rsgui-window-title";
	this.setAnchor(0.4,0.3);
	//this._title_offset = theme.window.title.offset;
	//this._panel_offset = theme.window.bg.offset;
	this._hasTexture=true;
	//this._titleBar.width=width;
	//this._titleBar.height=32;
	this.inputEnabled = true;
	//this.input.enableDrag();
	//this.events.onInputOver.add(this.onInputOverHandler, this);
	//this.events.onInputOut.add(this.onInputOutHandler, this);
	this.events.onInputDown.add(this.onInputDownHandler, this);
	this.events.onInputUp.add(this.onInputUpHandler, this);

	this.onShow =new Phaser.Signal();
	this.onClose=new Phaser.Signal();
};
Window.prototype = Object.create(GUIContainer.prototype);
Window.prototype.constructor = Window;
/*Window.prototype.update = function() {
	GUIObject.prototype.update.call(this);
	Phaser.Group.prototype.update.call(this);
};*/
Window.prototype.drawCanvas=function(){
	//GUIContainer.prototype.draw.call(this);
	this._bmd.cls();
	if(this._focus){
		this._bmd.ctx.fillStyle= "#666";
	}else{
		this._bmd.ctx.fillStyle= "#999";
	}
	this._bmd.ctx.roundRect(0, 0, this.width, 32, 12, true, 'up');
	//this._bmd.draw(this._text, 12, 6, null, null, 'normal');
	//this._bmd.ctx.strokeStyle = "rgb(127, 127, 127)";
	this._bmd.ctx.fillStyle= "#ddd";
	this._bmd.ctx.roundRect(0, this._title_height, this.width,
		 this.height-this._title_height, 12, true,'down');
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
	this._bmd.generateThreePatchTexture(this._window_title,0,0,
		w,th,TH,TW,TH);
	//this._bmd.draw(this._text, r, r, null, null, 'normal');
}
Window.prototype.addChild=function(object){
	GUIContainer.prototype.addChild.call(this,object);
	object.y+=this._title_height;
}
Window.prototype.removeChild=function(object){
	GUIContainer.prototype.removeChild.call(this,object);
	object.y-=this._title_height;
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
