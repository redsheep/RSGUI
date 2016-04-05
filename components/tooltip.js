ToolTipDirect={
  Top:'top',
  Bottom:'bottom',
  Left:'left',
  Right:'right'
}
ToolTip = function (game, x, y,text,direct) {
  GUIObject.call(this, game, x, y);
  this._text=text;
  this._warp=true;
  this._direct=direct||'top';
  this._arrow={top:0,bottom:0,left:0,right:0};
  this._arrow[direct]=10;
  this._extendHeight=this._arrow.top+this._arrow.bottom;
  this._extendWidth=this._arrow.left+this._arrow.right;

  this.onPopup =new Phaser.Signal();
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
	this._bmd.ctx.moveTo(b+a.left, r+a.top);
	this._bmd.ctx.quadraticCurveTo(b+a.left, a.top, r+a.left, a.top);
  if(this._direct=='top'){
  	this._bmd.ctx.lineTo(w/2-a.top/2, a.top);
  	this._bmd.ctx.lineTo(w/2, b);
  	this._bmd.ctx.lineTo(w/2+a.top/2, a.top);
  }
	this._bmd.ctx.lineTo(w-r-a.right, a.top);
	this._bmd.ctx.quadraticCurveTo(w-a.right, a.top, w-a.right, r+a.top);
  if(this._direct=='right'){
  	this._bmd.ctx.lineTo(w-a.right, h/2-a.right/2);
  	this._bmd.ctx.lineTo(w, h/2);
  	this._bmd.ctx.lineTo(w-a.right, h/2+a.right/2);
  }
	this._bmd.ctx.lineTo(w-a.right, h-r-a.bottom);
	this._bmd.ctx.quadraticCurveTo(w-a.right, h-a.bottom, w-r-a.right, h-a.bottom);
  if(this._direct=='bottom'){
  	this._bmd.ctx.lineTo(w/2+a.bottom/2, h-a.bottom);
  	this._bmd.ctx.lineTo(w/2, h-b);
  	this._bmd.ctx.lineTo(w/2-a.bottom/2, h-a.bottom);
  }
	this._bmd.ctx.lineTo(r+a.left, h-a.bottom);
	this._bmd.ctx.quadraticCurveTo(b+a.left, h-a.bottom, b+a.left, h - r-a.bottom);
  if(this._direct=='left'){
  	this._bmd.ctx.lineTo(b+a.left, h/2+a.left/2);
  	this._bmd.ctx.lineTo(b, h/2);
  	this._bmd.ctx.lineTo(b+a.left, h/2-a.left/2);
  }
	this._bmd.ctx.closePath();
	this._bmd.ctx.fillStyle=this._color;
	this._bmd.ctx.fill();
	this._bmd.ctx.strokeStyle = this._borderColor;
	this._bmd.ctx.strokeBorder(b);
	//draw text
	this._bmd.ctx.fillStyle=fontcolor;
	this._bmd.ctx.font=font;
	this._bmd.ctx.textBaseline='top';
	this._bmd.ctx.warpText(this._text, b+r+a.left, b+r+a.top);
}
ToolTip.prototype.getType=function(){
	return 'tooltip';
}
ToolTip.prototype.setText=function(text){
	this._text=text;
	this.fit();
}
