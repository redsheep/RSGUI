//  Here is a custom game object
ScrollBar = function (game, x, y,radius, border) {
	var height=2*border+2*radius+120;
	var width=2*border+2*radius+0;
	this._bmd = new Phaser.BitmapData(game, '', width, height);
	GUIObject.call(this, game, x, y, width, height);

	this._border=border;
	this._radius=radius;
	this._position=0;
	this._range={minvalue:0,maxvalue:100};
	this._buttonheight=width-2*border+10;

};
ScrollBar.prototype = Object.create(GUIObject.prototype);
ScrollBar.prototype.constructor = ScrollBar;
ScrollBar.prototype.update = function() {
	var sx=this.scale.x;
	var sy=this.scale.y;
	var b=this._border;
	var r=this._radius;
	var w=this.width;
	var h=this.height;
	var p=this._position;
	var bh=this._buttonheight*sy;
	if(this._state=='buttondown'){
		var py=this.game.input.worldY-this.parent.y;//-this.y;
		this._position=Math.min( Math.max(py, this.y+w/sx/2*sy+b),this.y+h-w/sx/2*sy-b-bh)-this.y-w/sx/2*sy-b;
	}
	GUIObject.prototype.update.call(this);
};
ScrollBar.prototype.drawCanvas=function(){
	var b=this._border;
	var r=this._radius;
	var w=this.width/this.scale.x;
	var h=this.height/this.scale.y;
	var p=this._position/this.scale.y;
	var bh=this._buttonheight;
	this._bmd.cls();
	//draw scroll bar
	this._bmd.ctx.beginPath();
	var grd = this._bmd.ctx.createLinearGradient(0, 0, w, 0);
	grd.addColorStop(0, '#333');
	grd.addColorStop(0.5, '#666');
	grd.addColorStop(1.0, '#333');
	this._bmd.ctx.fillStyle = grd;
	this._bmd.ctx.roundRect(0, 0, w, h, r, true);
	//this._bmd.ctx.fill();
	//draw scroll bar button
	this._bmd.ctx.beginPath();
	this._bmd.ctx.fillStyle = "#fff"
	this._bmd.ctx.roundRect(b+r/4, p+b+w/2, w-2*b-r/2, bh, r/2, true);
	//this._bmd.ctx.fill();
	//draw scroll bar up button
	this._bmd.ctx.beginPath();
	this._bmd.ctx.moveTo(w/2,b);
	this._bmd.ctx.lineTo(b+1,w/2);
	this._bmd.ctx.lineTo(w-b-2,w/2);
	this._bmd.ctx.closePath();
	//this._bmd.ctx.stroke();
	this._bmd.ctx.fill();
	//draw scroll bar down button
	this._bmd.ctx.beginPath();
	this._bmd.ctx.moveTo(w/2,h-b);
	this._bmd.ctx.lineTo(b+1,h-w/2);
	this._bmd.ctx.lineTo(w-b-2,h-w/2);
	this._bmd.ctx.closePath();
	//this._bmd.ctx.stroke();
	this._bmd.ctx.fill();
}
ScrollBar.prototype.drawTexture=function(){
	this._bmd.cls();
	var x=0;
	var y=0;
	var w=this.width;
	var h=this.height;
	var r=5;//this._radius;
	var W=this.game.cache.getImage(this._bgFrame).width;
	var H=this.game.cache.getImage(this._bgFrame).height;
	this._bmd.generateThreePatchTexture(this._bgFrame,x,y+8,w,16,r,W,H);
	var TW=this.game.cache.getImage(this._btnFrame).width;
	var TH=this.game.cache.getImage(this._btnFrame).height;
	var TX=this._position;
	this._bmd.copy(this._btnFrame,0,0,TW,TH,TX,0,32,32);
	//this._bmd.draw(this._text, r, r, null, null, 'normal');
}
ScrollBar.prototype.onInputDownHandler = function (sprite, pointer) {
	var sx=this.scale.x;
	var sy=this.scale.y;
	var b=this._border;
	var r=this._radius;
	var w=this.width;
	var h=this.height;
	var p=this._position;
	var bh=this._buttonheight*sy;
	var offsety=this.parent.y;
	GUIObject.prototype.onInputDownHandler.call(this,sprite,pointer);
	if(pointer.worldY<offsety+this.y+w/sx/2*sy){
		this._position=Math.max(p-1,0);
	}else if(pointer.worldY<offsety+this.y+h-w/sx/2*sy){
		if(pointer.worldY<offsety+this.y+p+b+w/sx/2*sy){
			this._position=Math.max(p-1,0);
		}else if(pointer.worldY>offsety+this.y+p+bh+b+w/sx/2*sy){
			this._position=Math.max(p+1,0);
		}else{
			this._state='buttondown';
		}
	}else{
		this._position=Math.max(p+1,0);
	}
};
