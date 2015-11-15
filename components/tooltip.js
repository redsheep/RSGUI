
ToolTip = function (game, x, y,text) {
  GUIObject.call(this, game, x, y);
  this._text=text;
  this._arrow={height:10,width:20};
  this._warp=true;
  this._extendHeight=this._arrow.height;
};
ToolTip.prototype = Object.create(GUIObject.prototype);
ToolTip.prototype.constructor = ToolTip;

ToolTip.prototype.draw=function(){
	var b=this._border;
	var r=this._radius;
	var w=this._originWidth-b;
	var h=this._originHeight-b;
	var a=this._arrow;
	var fontcolor=this._font.color;
	var font=this.getFont();
	//draw background
	this._bmd.cls();
	this._bmd.ctx.lineWidth=b;
	this._bmd.ctx.beginPath();
	this._bmd.ctx.moveTo(b, r+a.height);
	this._bmd.ctx.quadraticCurveTo(b, a.height, r, a.height);
	this._bmd.ctx.lineTo(w/2-a.width/2, a.height);
	this._bmd.ctx.lineTo(w/2, b);
	this._bmd.ctx.lineTo(w/2+a.width/2, a.height);
	this._bmd.ctx.lineTo(w - r, a.height);
	this._bmd.ctx.quadraticCurveTo(w, a.height, w, r+a.height);
	this._bmd.ctx.lineTo(w, h - r);
	this._bmd.ctx.quadraticCurveTo(w, h, w-r, h);
	this._bmd.ctx.lineTo(r, h);
	this._bmd.ctx.quadraticCurveTo(b, h, b, h - r);
	this._bmd.ctx.closePath();
	this._bmd.ctx.fillStyle=this._color;
	this._bmd.ctx.fill();
	this._bmd.ctx.strokeStyle = this._borderColor;
	this._bmd.ctx.strokeBorder(b);
	//draw text
	this._bmd.ctx.fillStyle=fontcolor;
	this._bmd.ctx.font=font;
	this._bmd.ctx.textBaseline='top';
	this._bmd.ctx.warpText(this._text, b+r, b+r+a.height);
}
ToolTip.prototype.getType=function(){
	return 'tooltip';
}
ToolTip.prototype.setText=function(text){
	this._text=text;
	this.fit();
}
