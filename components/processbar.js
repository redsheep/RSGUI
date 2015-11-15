
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
		var bgtexture=this._texture['bg'];
		var btntexture=this._texture['btn'];
		if(this._scrolltype=='vertical'){
			this._bmd.verticalThreePatchTexture(bgtexture.key,0,0,w,h,r,bgtexture.width,bgtexture.height);
			this._bmd.verticalThreePatchTexture(btntexture.key,0,0,w,p,r,btntexture.width,btntexture.height);
		}else{
			this._bmd.horizontalThreePatchTexture(bgtexture.key,0,0,w,h,r,bgtexture.width,bgtexture.height);
			this._bmd.horizontalThreePatchTexture(btntexture.key,0,0,p,h,r,btntexture.width,btntexture.height);
		}
	}
}
ProcessBar.prototype.getType=function(){
	return 'processbar';
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
