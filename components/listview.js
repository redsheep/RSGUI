
ListView = function (game, x, y, width, height) {

	GUIContainer.call(this, game, x, y, width, height);

};
ListView.prototype = Object.create(GUIContainer.prototype);
ListView.prototype.constructor = ListView;
ListView.prototype.draw=function(){
	var b=this._border;
	var r=this._radius;
	var w=this._originWidth;
	var h=this._originHeight;

	this._bmd.cls();
	this._bmd.ctx.strokeStyle = this._borderColor;
	this._bmd.ctx.fillStyle= this._color;
	this._bmd.ctx.rect(b,b,w-b,h-b);
	this._bmd.ctx.fill();
	this._bmd.ctx.strokeBorder(b);
}
ListView.prototype.getType=function(){
	return 'listview';
}
