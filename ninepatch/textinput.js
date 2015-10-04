//  Here is a custom game object
AssetCtrl.TextInput = function (game, theme, x, y,radius, border,text) {

	var style = { font: "bold 16px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
	//this._text = new Phaser.Text(game, 0, 0, text, style);

	var height=32;//2*border+2*radius+this._text.height;
	var width=150;//2*border+2*radius+this._text.width;
	this._bmd = new Phaser.BitmapData(game, '', width, height);
	GUIObject.call(this, game, x, y, width, height, text);

	this._text='text';
	this._border=border;
	this._radius=radius;
	this._focus=false;
	this._bgFrame="rsgui-scroll-bg";
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
AssetCtrl.TextInput.prototype = Object.create(GUIObject.prototype);
AssetCtrl.TextInput.prototype.constructor = AssetCtrl.TextInput;

AssetCtrl.TextInput.prototype.draw=function(){
	this._bmd.cls();
	var x=0;
	var y=0;
	var w=this.width;
	var h=this.height;
	var r=10;//this._radius;
	var W=this.game.cache.getImage(this._bgFrame).width;
	var H=this.game.cache.getImage(this._bgFrame).height;
	this._bmd.generateNinePatchTexture(this._bgFrame,x,y,w,h,r,W,H);

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
AssetCtrl.TextInput.prototype.onInputDownHandler = function (sprite, pointer) {
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
AssetCtrl.TextInput.prototype.onInputUpHandler = function (sprite, pointer, isOver) {
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
