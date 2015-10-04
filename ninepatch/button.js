AssetCtrl.CustomizeButton = function (game, theme, x, y, radius, border, text) {

	//var style = { font: "bold 16px Arial", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle" };
	this._text = text;//new Phaser.Text(game, 0, 0, text, style);
	height=2*radius+20;
	width=2*radius+this._text.length*10;
	//this._bmd = new Phaser.BitmapData(game, '', width, height);
	GUIObject.call(this, game, x, y, width, height);
	//this._button = new Phaser.Sprite(game, x, y, this._bmd);
	//this.x=x;this.y=y;
	//this._radius=radius;

	this._upFrame = "rsgui-button-up";
	this._downFrame = "rsgui-button-down";
	this._frame=this._upFrame;
	//this.inputEnabled = true;
	//Redirect the input events to here so we can handle animation updates, etc
	//this.events.onInputOver.add(this.onInputOverHandler, this);
	//this.events.onInputOut.add(this.onInputOutHandler, this);
	//this.events.onInputDown.add(this.onInputDownHandler, this);
	//this.events.onInputUp.add(this.onInputUpHandler, this);
	//this._upbmd = new Phaser.BitmapData(game, upFrame, width, height);
	//this._overbmd = new Phaser.BitmapData(game, overFrame, width, height);
	//this._downbmd = new Phaser.BitmapData(game, downFrame, width, height);
};
AssetCtrl.CustomizeButton.prototype = Object.create(GUIObject.prototype);
AssetCtrl.CustomizeButton.prototype.constructor = AssetCtrl.CustomizeButton;
AssetCtrl.CustomizeButton.prototype.update = function() {
	this.draw();
};

AssetCtrl.CustomizeButton.prototype.draw=function(){
	this._bmd.cls();
	var x=0;
	var y=0;
	var w=this.width;
	var h=this.height;
	var r=10;//this._radius;
	var W=this.game.cache.getImage(this._frame).width;
	var H=this.game.cache.getImage(this._frame).height;
	this._bmd.generateNinePatchTexture(this._frame,x,y,w,h,r,W,H);
	this._bmd.ctx.font="20px Arial";
	this._bmd.ctx.fillStyle="#000";
	this._bmd.ctx.fillText(this._text,10,20);
}
/**
* Internal function that handles input events.
*
* @method Phaser.Button#onInputDownHandler
* @protected
* @param {Phaser.Button} sprite - The Button that the event occurred on.
* @param {Phaser.Pointer} pointer - The Pointer that activated the Button.
*/
AssetCtrl.CustomizeButton.prototype.onInputDownHandler = function (sprite, pointer) {

	this._state='down';
	this._frame=this._downFrame;
    if (this.onInputDown)
    {
        this.onInputDown.dispatch(this, pointer);
    }
};

/**
* Internal function that handles input events.
*
* @method Phaser.Button#onInputUpHandler
* @protected
* @param {Phaser.Button} sprite - The Button that the event occurred on.
* @param {Phaser.Pointer} pointer - The Pointer that activated the Button.
*/
AssetCtrl.CustomizeButton.prototype.onInputUpHandler = function (sprite, pointer, isOver) {
    //  Input dispatched early, before state change (but after sound)
    this._state='up';
		this._frame=this._upFrame;
		if (this.onInputUp)
    {
        this.onInputUp.dispatch(this, pointer, isOver);
    }
    if (this.freezeFrames)
    {
        return;
    }
};
