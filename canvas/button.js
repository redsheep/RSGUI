//  Here is a custom game object
CustomizeButton = function (game, x, y,radius, border,text) {

	var style = { font: "bold 16px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
	this._text = new Phaser.Text(game, 0, 0, text, style);
	var height=2*border+2*radius+this._text.height;
	var width=2*border+2*radius+this._text.width;
	this._bmd = new Phaser.BitmapData(game, '', width, height);
	GUIObject.call(this, game, x, y, width, height, text);

	this._border=border;
	this._radius=radius;

};
CustomizeButton.prototype = Object.create(GUIObject.prototype);
CustomizeButton.prototype.constructor = CustomizeButton;

CustomizeButton.prototype.draw=function(){
	var b=this._border;
	var r=this._radius;
	this._bmd.cls();
	this._bmd.ctx.lineWidth="4";
	this._bmd.ctx.strokeStyle = "rgb(127, 127, 127)";
	if(this._state=='up'){
		var my_gradient = this._bmd.ctx.createLinearGradient(0,0,0,50);
		my_gradient.addColorStop(0,"#ccc");
		my_gradient.addColorStop(1,"#333");
		this._bmd.ctx.fillStyle = my_gradient;
	}else{
		this._bmd.ctx.fillStyle = "#333"
	}
	//x, y, width, height, radius, fill, stroke
	this._bmd.ctx.roundRect(b, b, this.width-2*b, this.height-2*b, r, true);
	this._bmd.draw(this._text, b+r, b+r, null, null, 'normal');
}
