//  Here is a custom game object
CheckBox = function (game, x, y, radius, border, text) {

	this._border=border;
	var style = { font: "bold 16px Arial", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle" };
	this._text = new Phaser.Text(game, 0, 0, text, style);
	this._radius=this._text.height/4;
	var height=2*border+this._text.height;
	var width=this._text.height+2*border+2*this._radius+this._text.width;
	this._bmd = new Phaser.BitmapData(game, '', width, height);
	Phaser.Sprite.call(this, game, x, y, this._bmd);
	
	this.x=x;this.y=y;
	this._seprate=2;
	this.width=width+this._seprate;
	this.height=height;
	this._check=false;
	
	
	this.inputEnabled = true;
	//  Redirect the input events to here so we can handle animation updates, etc
    //this.events.onInputOver.add(this.onInputOverHandler, this);
    //this.events.onInputOut.add(this.onInputOutHandler, this);
    this.events.onInputDown.add(this.onInputDownHandler, this);
    this.events.onInputUp.add(this.onInputUpHandler, this);
};
CheckBox.prototype = Object.create(Phaser.Sprite.prototype);
CheckBox.prototype.constructor = CheckBox;
CheckBox.prototype.update = function() {
	this.draw();
};
CheckBox.prototype.draw=function(){
	var b=this._border;
	var r=this._radius;
	this._bmd.cls();
	this._bmd.ctx.strokeStyle = "rgb(127, 127, 127)";
	this._bmd.ctx.fillStyle= "#000";
	this._bmd.ctx.roundRect(0, 0, this.height, this.height, r, true);
	if(this._check){
		this._bmd.ctx.fillStyle= "#fff";
		this._bmd.ctx.roundRect(r, r, this.height-2*r, this.height-2*r, 1, true);
	}//else{
		//this._bmd.ctx.roundRect(b, b, this.width-2*b, this.height-2*b, r, true);
	//}
	this._bmd.draw(this._text, this.height+this._seprate, r, null, null, 'normal');
}
/**
* Internal function that handles input events.
*
* @method Phaser.Button#onInputOverHandler
* @protected
* @param {Phaser.Button} sprite - The Button that the event occurred on.
* @param {Phaser.Pointer} pointer - The Pointer that activated the Button.
*/
CheckBox.prototype.onInputOverHandler = function (sprite, pointer) {

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
CheckBox.prototype.onInputOutHandler = function (sprite, pointer) {

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
CheckBox.prototype.onInputDownHandler = function (sprite, pointer) {

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
CheckBox.prototype.onInputUpHandler = function (sprite, pointer, isOver) {
    //  Input dispatched early, before state change (but after sound)
    if (this.onInputUp)
    {
        this.onInputUp.dispatch(this, pointer, isOver);
    }
    if (this.freezeFrames)
    {
        return;
    }
};

