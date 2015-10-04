//  Here is a custom game object
TextInput = function (game, x, y,radius, border,text) {

	var style = { font: "bold 16px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
	//this._text = new Phaser.Text(game, 0, 0, text, style);

	var height=32;//2*border+2*radius+this._text.height;
	var width=100;//2*border+2*radius+this._text.width;
	this._bmd = new Phaser.BitmapData(game, '', width, height);
	GUIObject.call(this, game, x, y, width, height, text);

	this._text='text';
	this._border=border;
	this._radius=radius;
	this._focus=false;
	// create the hidden input element
	var self=this;
	this._hiddenInput = document.createElement('input');
	this._hiddenInput.type = 'text';
	this._hiddenInput.style.position = 'fixed';
	this._hiddenInput.style.opacity = 0;
	this._hiddenInput.style.left=x;
	this._hiddenInput.style.top=y;
	document.body.appendChild(this._hiddenInput);
	// setup the keydown listener
  this._hiddenInput.addEventListener('keydown', function(e) {
    e = e || window.event;
  });
  this._hiddenInput.addEventListener('keyup', function(e) {
    e = e || window.event;
    self._text=this.value;
  });
};
TextInput.prototype = Object.create(GUIObject.prototype);
TextInput.prototype.constructor = TextInput;

TextInput.prototype.draw=function(){
	var b=this._border;
	var r=this._radius;
	this._bmd.cls();
	this._bmd.ctx.lineWidth="4";
	this._bmd.ctx.strokeStyle = "rgb(127, 127, 127)";
	this._bmd.ctx.fillStyle="#fff";
	//x, y, width, height, radius, fill, stroke
	this._bmd.ctx.roundRect(b, b, this.width-2*b, this.height-2*b, r, true);
	this._bmd.ctx.font="20px Arial";
	this._bmd.ctx.fillStyle="#000";
	this._bmd.ctx.fillText(this._text,r,r+20);
}
/**
* Internal function that handles input events.
*
* @method Phaser.Button#onInputDownHandler
* @protected
* @param {Phaser.Button} sprite - The Button that the event occurred on.
* @param {Phaser.Pointer} pointer - The Pointer that activated the Button.
*/
TextInput.prototype.onInputDownHandler = function (sprite, pointer) {
	var self=this;
	this._state='down';
	//if (this.onInputDown)
	//{
	//	this.onInputDown.dispatch(this, pointer);
	//}
	window.setTimeout(function (){
      self._hiddenInput.focus();
  }, 0);
};
/**
* Internal function that handles input events.
*
* @method Phaser.Button#onInputUpHandler
* @protected
* @param {Phaser.Button} sprite - The Button that the event occurred on.
* @param {Phaser.Pointer} pointer - The Pointer that activated the Button.
*/
TextInput.prototype.onInputUpHandler = function (sprite, pointer, isOver) {
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
