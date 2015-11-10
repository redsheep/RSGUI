
ProcessBar = function (game, x, y, width, height, type) {

	GUIObject.call(this, game, x, y, width, height);

	this._position=0;
	this._range={min:0,max:100};
	this._radius=6;
	this._border=1;
	this._showarrow=false;
	this._scrolltype=type;//vertical,horizontal
	this._bgFrame='rsgui-processbar-bg';
	this._btnFrame='rsgui-processbar-btn';
	this._downoffset=0;
	this._autofit=false;

	this.onChange =new Phaser.Signal();
};
ProcessBar.prototype = Object.create(GUIObject.prototype);
ProcessBar.prototype.constructor = ScrollBar;
ProcessBar.prototype.draw=function(){
	var b=this._border;
	var r=this._radius;
	var w=this._originWidth;
	var h=this._originHeight;
	var p=this._position;
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
			this._bmd.ctx.roundRect(b+r/4, b, w-2*b-r/2, p+b+r/4, r/2, true);
		}else{
			this._bmd.ctx.roundRect(b, b+r/4, p+b+r/4, h-2*b-r/2, r/2, true);
		}
		this._bmd.ctx.fill();
	}else{
		//draw scroll bar and button with texture
		var W=this.game.cache.getImage(this._bgFrame).width;
		var H=this.game.cache.getImage(this._bgFrame).height;
		var TW=this.game.cache.getImage(this._btnFrame).width;
		var TH=this.game.cache.getImage(this._btnFrame).height;
		if(this._scrolltype=='vertical'){
			this._bmd.verticalThreePatchTexture(this._bgFrame,0,0,w,h,r,W,H);
			this._bmd.verticalThreePatchTexture(this._btnFrame,0,0,w,p,r,TW,TH);
		}else{
			this._bmd.horizontalThreePatchTexture(this._bgFrame,0,0,w,h,r,W,H);
			this._bmd.horizontalThreePatchTexture(this._btnFrame,0,0,p,h,r,TW,TH);
		}
	}
}
ProcessBar.prototype.setTheme=function(theme){
	GUIObject.prototype.setTheme.call(this,theme);
	this._buttonColor=theme.button;
}
ProcessBar.prototype.getValue=function(){
	if(this._scrolltype=='vertical')
		maxposition=this.height;//-this._buttonheight;
	else
		maxposition=this.width;//-this._buttonheight;
	return (this._position/maxposition)*(this._range.max-this._range.min)+this._range.min;
}
ProcessBar.prototype.setValue=function(value){
	if(this._scrolltype=='vertical')
		maxposition=this.height;//-this._buttonheight;
	else
		maxposition=this.width;//-this._buttonheight;
	this._position=((value-this._range.min)/(this._range.max-this._range.min))*maxposition;
}
ProcessBar.prototype.setValueRange=function(minvalue,maxvalue){
	currentvalue=this.getValue();
	percent=currentvalue/(this._range.max-this._range.min);
	this._range={min:minvalue,max:maxvalue};
	currentvalue=(this._range.max-this._range.min)*percent;
	this.setValue(currentvalue);
}
