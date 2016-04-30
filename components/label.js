Label = function (game, x, y, text) {

	GUIObject.call(this, game, x, y);
	this._text=text;
};
Label.prototype = Object.create(GUIObject.prototype);
Label.prototype.constructor = Label;
Label.prototype.draw=function(){
  var fontcolor=this._font.color;
  var font=this.getFont();
	//draw text
	this._bmd.ctx.fillStyle=fontcolor;
	this._bmd.ctx.font=font;
	this._bmd.ctx.textBaseline='top';
	this._bmd.ctx.fillText(this._text, 0, 0);
}
