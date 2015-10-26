//  Here is a custom game object
ScrollBar = function (game, x, y) {
	//var height=2*border+2*radius+120;
	//var width=2*border+2*radius+0;
	GUIObject.call(this, game, x, y);

	//this._border=border;
	//this._radius=radius;
	this._position=0;
	this._range={minvalue:0,maxvalue:100};
	this._buttonheight=20;
	this._text=" ";
	this._originHeight=180;
	this._originWidth=20;
	this._radius=6;
	this._border=1;
	this._bgFrame='rsgui-scrollbar-bg';
	this._btnFrame='rsgui-scrollbar-btn';
};
ScrollBar.prototype = Object.create(GUIObject.prototype);
ScrollBar.prototype.constructor = ScrollBar;
ScrollBar.prototype.update = function() {
	var sx=this.scale.x;
	var sy=this.scale.y;
	var b=this._border;
	var r=this._radius;
	var w=this._originWidth;
	var h=this._originHeight;
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
	var w=this._originWidth;
	var h=this._originHeight;
	var p=this._position;
	var bh=this._buttonheight;
	this._bmd.cls();
	//draw scroll bar
	this._bmd.ctx.beginPath();
	//var grd = this._bmd.ctx.createLinearGradient(0, 0, w, 0);
	//grd.addColorStop(0, '#333');
	//grd.addColorStop(0.5, '#666');
	//grd.addColorStop(1.0, '#333');
	this._bmd.ctx.fillStyle = this._color;
	this._bmd.ctx.roundRect(0, 0, w, h, r, true);
	//this._bmd.ctx.fill();
	//draw scroll bar button
	this._bmd.ctx.beginPath();
	this._bmd.ctx.fillStyle = this._buttonColor;
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
	var w=this._originWidth;
	var h=this._originHeight;
	var r=this._radius;
	var W=this.game.cache.getImage(this._bgFrame).width;
	var H=this.game.cache.getImage(this._bgFrame).height;
	this._bmd.horizontalThreePatchTexture(this._bgFrame,0,0,2*r,h,r,W,H);
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
	var w=this._originWidth;
	var h=this._originHeight;
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
ScrollBar.prototype.setTheme=function(theme){
	GUIObject.prototype.setTheme.call(this,theme);
	this._buttonColor=theme.button;
}
ScrollBar.prototype.resize=function(width,height){
	this._originHeight=180;
	this._originWidth=20;
	this._bmd.resize(this._originWidth,this._originHeight);
	this.onResize.dispatch();
}
