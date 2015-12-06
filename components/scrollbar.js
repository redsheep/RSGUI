
ScrollBar = function (game, x, y, width, height, type) {

	GUIObject.call(this, game, x, y, width, height);

	this._position=0;
	this._range={min:0,max:100};
	this._buttonheight=20;
	this._radius=6;
	this._border=1;
	this._showarrow=false;
	this._scrolltype=type;//vertical,horizontal
	this._bgFrame='rsgui-scrollbar-bg';
	this._btnFrame='rsgui-scrollbar-btn';
	this._downoffset=0;
	this._autofit=false;

	this.onChange =new Phaser.Signal();
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
		this.onChange.dispatch(this,this._position);
	}
	this._redraw=true;
	GUIObject.prototype.update.call(this);
};
ScrollBar.prototype.draw=function(){
	var b=this._border;
	var r=this._radius;
	var w=this._originWidth;
	var h=this._originHeight;
	var p=this._position;
	var bh=this._buttonheight;
	this._bmd.cls();
	if(!this._hasTexture){
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
	}else{
		//draw scroll bar and button with texture
		var bgtexture=this._texture['bg'];
		var btntexture=this._texture['btn'];
		if(this._scrolltype=='vertical'){
			this._bmd.verticalThreePatchTexture(bgtexture.key,0,0,w,h,r,bgtexture.width,bgtexture.height);
			this._bmd.copy(btntexture.key,0,0,btntexture.width,btntexture.height,0,p,bh,bh);
		}else{
			this._bmd.horizontalThreePatchTexture(bgtexture.key,0,0,w,h,r,bgtexture.width,bgtexture.height);
			this._bmd.copy(btntexture.key,0,0,btntexture.width,btntexture.height,p,0,bh,bh);
		}
	}
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
ScrollBar.prototype.getType=function(){
	return 'scrollbar';
}
ScrollBar.prototype.setTheme=function(theme){
	GUIObject.prototype.setTheme.call(this,theme);
	this._buttonColor=theme.button;
}
ScrollBar.prototype.getValue=function(){
	if(this._scrolltype=='vertical')
		maxposition=this.height-this._buttonheight;
	else
		maxposition=this.width-this._buttonheight;
	return (this._position/maxposition)*(this._range.max-this._range.min)+this._range.min;
}
ScrollBar.prototype.setValue=function(value){
	if(this._scrolltype=='vertical')
		maxposition=this.height-this._buttonheight;
	else
		maxposition=this.width-this._buttonheight;
	this._position=((value-this._range.min)/(this._range.max-this._range.min))*maxposition;
}
ScrollBar.prototype.setValueRange=function(minvalue,maxvalue){
	currentvalue=this.getValue();
	percent=currentvalue/(this._range.max-this._range.min);
	this._range={min:minvalue,max:maxvalue};
	currentvalue=(this._range.max-this._range.min)*percent;
	this.setValue(currentvalue);
}
