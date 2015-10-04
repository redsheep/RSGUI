//  Here is a custom game object
GUIObject = function (game, x, y, width, height) {

	this._bmd=new Phaser.BitmapData(game, '', width, height);
	Phaser.Sprite.call(this, game,x ,y, this._bmd);
	//this.game.world.addChild(this._inputHandler);

	this.x=x;this.y=y;
	//this._radius=radius;
	this.width=width;
	this.height=height;
	this._state='up';

	this.inputEnabled = true;
	//Redirect the input events to here so we can handle animation updates, etc
	//this.events.onInputOver.add(this.onInputOverHandler, this);
	//this.events.onInputOut.add(this.onInputOutHandler, this);
	this.events.onInputDown.add(this.onInputDownHandler, this);
	this.events.onInputUp.add(this.onInputUpHandler, this);
};
GUIObject.prototype = Object.create(Phaser.Sprite.prototype);
GUIObject.prototype.constructor = GUIObject;
GUIObject.prototype.update = function() {
	this.draw();
};
GUIObject.prototype.draw=function(){ }
/**
* Internal function that handles input events.
*
* @method Phaser.Button#onInputOverHandler
* @protected
* @param {Phaser.Button} sprite - The Button that the event occurred on.
* @param {Phaser.Pointer} pointer - The Pointer that activated the Button.
*/
GUIObject.prototype.onInputOverHandler = function (sprite, pointer) {

	//  If the Pointer was only just released then we don't fire an over event
	if (pointer.justReleased())
	{
		return;
	}

	if (this.onOverMouseOnly && !pointer.isMouse)
	{
		return;
	}

	if (this.onInputOver)
	{
		this.onInputOver.dispatch(this, pointer);
	}

	this._state='over';

};

/**
* Internal function that handles input events.
*
* @method Phaser.Button#onInputOutHandler
* @protected
* @param {Phaser.Button} sprite - The Button that the event occurred on.
* @param {Phaser.Pointer} pointer - The Pointer that activated the Button.
*/
GUIObject.prototype.onInputOutHandler = function (sprite, pointer) {

	this._state='up';

	if (this.onInputOut)
	{
		this.onInputOut.dispatch(this, pointer);
	}
};

/**
* Internal function that handles input events.
*
* @method Phaser.Button#onInputDownHandler
* @protected
* @param {Phaser.Button} sprite - The Button that the event occurred on.
* @param {Phaser.Pointer} pointer - The Pointer that activated the Button.
*/
GUIObject.prototype.onInputDownHandler = function (sprite, pointer) {

	if (this.onInputDown)
	{
		this.onInputDown.dispatch(this, pointer);
	}

	this._state='down';

};

/**
* Internal function that handles input events.
*
* @method Phaser.Button#onInputUpHandler
* @protected
* @param {Phaser.Button} sprite - The Button that the event occurred on.
* @param {Phaser.Pointer} pointer - The Pointer that activated the Button.
*/
GUIObject.prototype.onInputUpHandler = function (sprite, pointer, isOver) {
	//  Input dispatched early, before state change (but after sound)

	if (this.onInputUp)
	{
		this.onInputUp.dispatch(this, pointer, isOver);
	}
	if (this.freezeFrames)
	{
		return;
	}
	this._state='up';
};
