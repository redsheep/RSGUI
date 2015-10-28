
ScrollBar = function (game, x, y, width, height, type) {

	GUIObject.call(this, game, x, y, width, height);

	this._position=0;
	this._range={minvalue:0,maxvalue:100};
	this._buttonheight=20;
	this._text=" ";
	this._radius=6;
	this._border=1;
	this._showarrow=false;
	this._scrolltype=type;//vertical,horizontal
	this._bgFrame='rsgui-scrollbar-bg';
	this._btnFrame='rsgui-scrollbar-btn';
	this._downoffset=0;
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
		if(this._scrolltype=='vertical'){
			var py=this.game.input.worldY-this.world.y-this._downoffset;//-this.y;
			this._position=Math.min( Math.max(py, 0),h-bh);
		}else{
			var px=this.game.input.worldX-this.world.x-this._downoffset;//-this.y;
			this._position=Math.min( Math.max(px, 0),w-bh);
		}
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
	this._bmd.ctx.fillStyle = this._color;
	this._bmd.ctx.roundRect(0, 0, w, h, r, true);
	this._bmd.ctx.fill();
	this._bmd.ctx.strokeBorder(b);
	//draw scroll bar button
	this._bmd.ctx.fillStyle = this._buttonColor;
	if(this._scrolltype=='vertical'){
		this._bmd.ctx.roundRect(b+r/4, p+b, w-2*b-r/2, bh, r/2, true);
	}else{
		this._bmd.ctx.roundRect(p+b, b+r/4, bh, h-2*b-r/2, r/2, true);
	}
	this._bmd.ctx.fill();
	
	if(this._showarrow){
		//draw scroll bar up button
		this._bmd.ctx.beginPath();
		this._bmd.ctx.moveTo(w/2,b);
		this._bmd.ctx.lineTo(b+1,w/2);
		this._bmd.ctx.lineTo(w-b-2,w/2);
		this._bmd.ctx.closePath();
		this._bmd.ctx.fill();
		//draw scroll bar down button
		this._bmd.ctx.beginPath();
		this._bmd.ctx.moveTo(w/2,h-b);
		this._bmd.ctx.lineTo(b+1,h-w/2);
		this._bmd.ctx.lineTo(w-b-2,h-w/2);
		this._bmd.ctx.closePath();
		this._bmd.ctx.fill();
	}
}
ScrollBar.prototype.drawTexture=function(){
	this._bmd.cls();
	var w=this._originWidth;
	var h=this._originHeight;
	var r=this._radius;
	var bh=this._buttonheight;
	var W=this.game.cache.getImage(this._bgFrame).width;
	var H=this.game.cache.getImage(this._bgFrame).height;
	var TW=this.game.cache.getImage(this._btnFrame).width;
	var TH=this.game.cache.getImage(this._btnFrame).height;
	var TX=this._position;
	if(this._scrolltype=='vertical'){
		this._bmd.verticalThreePatchTexture(this._bgFrame,0,0,w,h,r,W,H);
		this._bmd.copy(this._btnFrame,0,0,TW,TH,0,TX,bh,bh);
		//this._bmd.ctx.roundRect(b+r/4, p+b, w-2*b-r/2, bh, r/2, true);
	}else{
		this._bmd.horizontalThreePatchTexture(this._bgFrame,0,0,w,h,r,W,H);
		this._bmd.copy(this._btnFrame,0,0,TW,TH,TX,0,bh,bh);
		//this._bmd.ctx.roundRect(p+b, b+r/4, bh, h-2*b-r/2, r/2, true);
	}
	//this._bmd.draw(this._text, r, r, null, null, 'normal');
}
ScrollBar.prototype.onInputUpHandler = function (sprite, pointer) {
	GUIObject.prototype.onInputUpHandler.call(this,sprite,pointer);
	this._downoffset=0;
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
	GUIObject.prototype.onInputDownHandler.call(this,sprite,pointer);
	if(this._scrolltype=='vertical'){
		var offset=this.world.y;
		var point=pointer.worldY;
		this._downoffset=pointer.worldY-offset-p;
	}else{
		var offset=this.world.x;
		var point=pointer.worldX;
		this._downoffset=pointer.worldX-offset-p;
	}
	if(point<offset+p){
		this._position=Math.max(p-1,0);
	}else if(point<offset+p+bh){
		this._state='buttondown';
	}else{
		this._position=Math.max(p+1,0);
	}
};
ScrollBar.prototype.setTheme=function(theme){
	GUIObject.prototype.setTheme.call(this,theme);
	this._buttonColor=theme.button;
}
ScrollBar.prototype.setFont=function(font){}
