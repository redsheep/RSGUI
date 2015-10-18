//  Here is a custom game object
TextInput = function (game, x, y,radius, border,text) {

	this._minWidth=100;
	this._text=text;
	var txtsize=getTextSize('Arial',20,text);
	var height=2*radius+2*border+ txtsize.height;
	var width=2*radius+2*border+ this._minWidth;
	//this._bmd = new Phaser.BitmapData(game, '', width, height);
	GUIObject.call(this, game, x, y, width, height, text);

	this._text=text;
	this._border=border;
	this._radius=radius;
	this._focus=false;
	this._cursor=radius+border;
	this._bgFrame="rsgui-scroll-bg";
	// create the hidden input element
	var self=this;
	this._hiddenInput = document.createElement('input');
	this._hiddenInput.type = 'text';
	this._hiddenInput.style.position = 'absolute';
	this._hiddenInput.style.opacity = 0;
	this._hiddenInput.style.left=(x+radius+border)+'px';
	this._hiddenInput.style.top=(y+radius+border-30)+'px';
	this._hiddenInput.value=text;
	this._delay=0;
	document.body.appendChild(this._hiddenInput);
	// setup the keydown listener
	this._hiddenInput.addEventListener('keydown', function(e) {
		e = e || window.event;
	});
	this._hiddenInput.addEventListener('keyup', function(e) {
		e = e || window.event;
		//self._text=this.value;
		//var oldwidth=getTextSize('Arial',20, self._text).width
		var b=self._border;
		var r=self._radius;
		//var h=self.height/self.scale.y;
		var w=self.width/self.scale.x;
		//var newwidth = getTextSize('Arial',20, this.value ).width;
		//var distance=newwidth-oldwidth;
		//var pos=self._cursor+distance;
		self._text=this.value;
		var textwidth=getTextSize('Arial',20, self._text ).width;
		//var pos=getCaretPos(this._hiddenInput);
		var pos=this.selectionStart;
		var offset=Math.max(0,textwidth-w+2*r+2*b);
		self._cursor=getTextSize('Arial',20, self._text.substring(0,pos)).width-offset+r+b;
		//console.log(pos);
		//var textwidth=getTextSize('Arial',20, self._text ).width;
		//if(textwidth<w) self._cursor=textwidth+r+b;
		//else self._cursor=w-2*r-2*b;
	});
	this._hasTexture=true;

};
TextInput.prototype = Object.create(GUIObject.prototype);
TextInput.prototype.constructor = TextInput;

TextInput.prototype.drawCanvas=function(){
	var b=this._border;
	var r=this._radius;
	var w=this._originWidth;
	var h=this._originHeight;
	this._bmd.cls();
	this._bmd.ctx.save();
	this._bmd.ctx.fillRect(r+b,r+b,w-2*r-2*b,h-2*r-2*b);
	this._bmd.ctx.globalCompositeOperation="source-in";
	this._bmd.ctx.font="20px Arial";
	this._bmd.ctx.fillStyle="#000";
	this._bmd.ctx.textBaseline="top";
	var textwidth=getTextSize('Arial',20, this._text ).width;
	var offset=Math.max(0,textwidth-w+2*r+2*b);
	this._bmd.ctx.fillText(this._text, r+b-offset,r+b);
	this._bmd.ctx.globalCompositeOperation="destination-over";
	if(this._focus && this._delay++%66<33){
		this._bmd.ctx.fillRect(this._cursor,r+b,1, h-2*r-2*b);
	}

	this._bmd.ctx.lineWidth=b.toString();
	this._bmd.ctx.strokeStyle = "rgb(127, 127, 127)";
	this._bmd.ctx.fillStyle="#fff";
	//x, y, width, height, radius, fill, stroke
	this._bmd.ctx.roundRect(b, b, w-2*b, h-2*b, r, true);
	this._bmd.ctx.restore();
}
TextInput.prototype.drawTexture=function(){
	this._bmd.cls();
	var w=this._originWidth;
	var h=this._originHeight;
	var r=this._radius;
	var W=this.game.cache.getImage(this._bgFrame).width;
	var H=this.game.cache.getImage(this._bgFrame).height;
	this._bmd.generateNinePatchTexture(this._bgFrame,0,0,w,h,r,W,H);
	if(this._focus && this._delay++%66<33){
		this._bmd.ctx.fillRect(this._cursor,r,1, h-2*r);
	}
	this._bmd.ctx.font="20px Arial";
	this._bmd.ctx.fillStyle="#000";
	this._bmd.ctx.textBaseline="top";
	this._bmd.ctx.fillText(this._text,r,r);
}
TextInput.prototype.getCursorPos=function(pos){
	var total=this._text.length;
	var nearest=total;
	var distance=getTextSize('Arial',20, this._text).width;
	for(i=0;i<=total;i++){
		substr=this._text.substring(0,i);
		width=getTextSize('Arial',20, substr).width;
		if(Math.abs(width-pos)<distance){
			nearest=i;
			distance=Math.abs(width-pos);
		}
	}
	//console.log(this._text.substring(0,nearest),pos,nearest);
	return nearest;//getTextSize('Arial',20, this._text.substring(0,nearest)).width;
}
TextInput.prototype.onInputDownHandler = function (sprite, pointer) {
	var self=this;
	this._state='down';
	var b=this._border;
	var r=this._radius;
	var w=this._originWidth;
	var h=this._originHeight;
	var px=pointer.worldX-this.parent.x-this.x-r-b;
	var textwidth=getTextSize('Arial',20, this._text ).width;
	var offset=Math.max(0,textwidth-w+2*r+2*b);
	var pos=this.getCursorPos(px+offset);
	this._cursor=getTextSize('Arial',20, this._text.substring(0,pos)).width-offset+r+b;
	// console.log(pos,offset);
	window.setTimeout(function (){
		self._hiddenInput.focus();
	}, 0);
	window.setTimeout(function (){
		self._hiddenInput.setSelectionRange(pos,pos);
	}, 0);
	GUIObject.prototype.onInputDownHandler.call(this,sprite,pointer);
};
