//  Here is a custom game object
ListView = function (game, x, y, width, height) {

	//var height=2*radius+2*border+16; //+txtsize.height;
	//var width=2*radius+2*border+48; //height+this._seprate+txtsize.width;
	GUIContainer.call(this, game, x, y, width, height);


};
ListView.prototype = Object.create(GUIContainer.prototype);
ListView.prototype.constructor = ListView;
ListView.prototype.drawCanvas=function(){
	var b=this._border;
	var r=this._radius;
  var w=this._originWidth;
  var h=this._originHeight;

	this._bmd.cls();
	this._bmd.ctx.strokeStyle = "#999";
	this._bmd.ctx.fillStyle= "#333";
	this._bmd.ctx.rect(0,0,w,h);
  this._bmd.ctx.fill();
}
