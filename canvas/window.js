//  Here is a custom game object
Window = function (game, x, y, width, height, text) {

	this._text = new Phaser.Text(game, 0, 0, text, { font: "bold 16px Arial", fill: "#000"});

	GUIContainer.call(this, game, x, y+32, width, height);

	this._titleBarbmd = new Phaser.BitmapData(game, '', width, 32);
	this._titleBar = game.add.sprite(x,y,this._titleBarbmd);
	this._panel = game.add.sprite(x,y+32,this._bmd);

	this._titleBar.width=width;
	this._titleBar.height=32;
	this._titleBar.inputEnabled = true;
	this._titleBar.input.enableDrag();
	//this.events.onInputOver.add(this.onInputOverHandler, this);
	//this.events.onInputOut.add(this.onInputOutHandler, this);
	this._titleBar.events.onInputDown.add(this.onInputDownHandler, this);
	this._titleBar.events.onInputUp.add(this.onInputUpHandler, this);
};
Window.prototype = Object.create(GUIContainer.prototype);
Window.prototype.constructor = Window;
Window.prototype.update = function() {
	this.draw();
	if(this._state=='down'){
		this.x=this._titleBar.x;
		this.y=this._titleBar.y+32;
		this._panel.x=this.x;
		this._panel.y=this.y;
	}
	GUIContainer.prototype.update.call(this);
};
Window.prototype.draw=function(){
	GUIContainer.prototype.draw.call(this);
	this._titleBarbmd.cls();
	if(this._focus){
		this._titleBarbmd.ctx.fillStyle= "#666";
	}else{
		this._titleBarbmd.ctx.fillStyle= "#999";
	}
	this._titleBarbmd.ctx.roundRect(0, 0, this._width, 32, 12, true, 'up');
	this._titleBarbmd.draw(this._text, 12, 6, null, null, 'normal');
	//this._bmd.ctx.strokeStyle = "rgb(127, 127, 127)";
	this._bmd.ctx.fillStyle= "#ddd";
	this._bmd.ctx.roundRect(0, 0, this._width, this._height, 12, true,'down');
}
/**
* Internal function that handles input events.
*
* @method Phaser.Button#onInputOverHandler
* @protected
* @param {Phaser.Button} sprite - The Button that the event occurred on.
* @param {Phaser.Pointer} pointer - The Pointer that activated the Button.
*/
Window.prototype.onInputOverHandler = function (sprite, pointer) {

    //  If the Pointer was only just released then we don't fire an over event
    if (pointer.justReleased())
    {
        return;
    }

    this._state='over';

    if (this.onOverMouseOnly && !pointer.isMouse)
    {
        return;
    }

    if (this.onInputOver)
    {
        this.onInputOver.dispatch(this, pointer);
    }

};

/**
* Internal function that handles input events.
*
* @method Phaser.Button#onInputOutHandler
* @protected
* @param {Phaser.Button} sprite - The Button that the event occurred on.
* @param {Phaser.Pointer} pointer - The Pointer that activated the Button.
*/
Window.prototype.onInputOutHandler = function (sprite, pointer) {

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
Window.prototype.onInputDownHandler = function (sprite, pointer) {

this._state='down';
    if(this._check){
		this._check=false;
	}else{
		this._check=true;
	}

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
Window.prototype.onInputUpHandler = function (sprite, pointer, isOver) {
    //  Input dispatched early, before state change (but after sound)
    this._state='up';
		if (this.onInputUp)
    {
        this.onInputUp.dispatch(this, pointer, isOver);
    }
    if (this.freezeFrames)
    {
        return;
    }
};
