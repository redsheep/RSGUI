//  Here is a custom game object
GUIContainer = function (game, x, y, width, height) {

	Phaser.Group.call(this, game);

	this.x=x;this.y=y;
	this._width=width;
	this._height=height;
	this._focus=true;
	this._bmd=new Phaser.BitmapData(game, '', width, height);
	//this._inputHandler=game.add.sprite(x,y,this._bmd);
	//this.game.world.addChild(this._inputHandler);

	//this._inputHandler.inputEnabled = true;
	//Redirect the input events to here so we can handle animation updates, etc
	//this.events.onInputOver.add(this.onInputOverHandler, this);
	//this.events.onInputOut.add(this.onInputOutHandler, this);
	//this._inputHandler.events.onInputDown.add(this.onInputDownHandler, this);
	//this._inputHandler.events.onInputUp.add(this.onInputUpHandler, this);
};
GUIContainer.prototype = Object.create(Phaser.Group.prototype);
GUIContainer.prototype.constructor = GUIContainer;
GUIContainer.prototype.update = function() {
	//this.draw();
	Phaser.Group.prototype.update.call(this);
	//this._inputHandler.x=this.x;
	//this._inputHandler.y=this.y;
	//for(var c in this.children){
	//	this.children[c].update();
	//}
};
GUIContainer.prototype.draw=function(){
	//var b=this._border;
	//var r=this._radius;
	//this._bmd.cls();
	//this._bmd.ctx.strokeStyle = "rgb(127, 127, 127)";
	//this._bmd.ctx.fillStyle= "#ddd";
	//this._bmd.ctx.roundRect(0, 0, this._width, this._height, 12, true,'down');
	//this._bmd.draw(this._text, 2, 2, null, null, 'normal');
}
