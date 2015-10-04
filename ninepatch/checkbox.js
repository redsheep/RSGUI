AssetCtrl.CheckBox = function(game, theme, x, y, radius, border, text) {

	var style = { font: "bold 16px Arial", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle" };
	this._text = new Phaser.Text(game, 0, 0, text, style);
	height=24;//2*radius+this._text.height;
	width=28+this._text.width;
	GUIObject.call(this, game, x, y, width, height);

	this._onFrame = "rsgui-check-on";
	this._offFrame = "rsgui-check-off";
	this._frame=this._offFrame;
};
AssetCtrl.CheckBox.prototype = Object.create(GUIObject.prototype);
AssetCtrl.CheckBox.prototype.constructor = AssetCtrl.CheckBox;
AssetCtrl.CheckBox.prototype.update = function() {
	this.draw();
};

AssetCtrl.CheckBox.prototype.draw=function(){
	this._bmd.cls();
	var x=0;
	var y=0;
	var w=this.width;
	var h=this.height;
	var r=5;//this._radius;
	var W=this.game.cache.getImage(this._frame).width;
	var H=this.game.cache.getImage(this._frame).height;
	this._bmd.copy(this._frame,0,0,W,H,0,0,24,24);
	this._bmd.draw(this._text, 24, 0, null, null, 'normal');
}
/**
* Internal function that handles input events.
*
* @method Phaser.Button#onInputDownHandler
* @protected
* @param {Phaser.Button} sprite - The Button that the event occurred on.
* @param {Phaser.Pointer} pointer - The Pointer that activated the Button.
*/
AssetCtrl.CheckBox.prototype.onInputDownHandler = function (sprite, pointer) {

  if(this._check){
		this._check=false;
		this._frame=this._offFrame;
	}else{
		this._check=true;
		this._frame=this._onFrame;
	}

    if (this.onInputDown)
    {
        this.onInputDown.dispatch(this, pointer);
    }
};
