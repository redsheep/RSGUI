
TextInput = function (game, x, y, text, type) {

	GUIObject.call(this, game, x, y);
	if(typeof(type)=='undefined')
		type="text";
	this._value=text;
	this._type=type;
	this._minWidth=80;
	this._focus=false;
	this._bgFrame="rsgui-textinput-bg";
	if(this._type=="password"){
		this._text=Array(this._value.length+1).join('*')
	}else{
		this._text=this._value;
	}
	// create the hidden input element
	var self=this;
	this._hiddenInput = document.createElement('input');
	this._hiddenInput.type = 'text';
	this._hiddenInput.style.position = 'absolute';
	this._hiddenInput.style.opacity = 0;
	this._hiddenInput.style.left='0px';//(this.world.x+radius+border)+'px';
	this._hiddenInput.style.top='0px';//(this.world.y+radius+border-30)+'px';
	this._hiddenInput.style.width='1px';
	this._hiddenInput.style.height='1px';
	this._hiddenInput.value=text;
	this._delay=0;
	document.body.appendChild(this._hiddenInput);
	// setup the keydown listener
	this._hiddenInput.addEventListener('keydown', function(e) {
		e = e || window.event;
	});
	this._hiddenInput.addEventListener('keyup', function(e) {
		e = e || window.event;
		var b=self._border;
		var r=self._radius;
		var w=self._originWidth;
		if(self._type=="password"){
			self._text=Array(this.value.length+1).join('*')
			self._value=this.value;
		}else{
			self._value=this.value;
			self._text=this.value;
		}
		self.onChange.dispatch(self._value,self);
		var textwidth=getTextSize(self._font.family,self._font.size, self._text ).width;
		var pos=this.selectionStart;
		var offset=Math.max(0,textwidth-w+2*r+2*b);
		self._cursor=getTextSize(self._font.family,self._font.size,
		 				self._text.substring(0,pos)).width-offset+r+b;
		self._redraw=true;
	});
	this.onChange=new Phaser.Signal();
};
TextInput.prototype = Object.create(GUIObject.prototype);
TextInput.prototype.constructor = TextInput;

TextInput.prototype.draw=function(){
	var b=this._border;
	var r=this._radius;
	var w=this._originWidth;
	var h=this._originHeight;
	var fontcolor=this._font.color;
	var font=this.getFont();
	this._bmd.cls();
	this._bmd.ctx.lineWidth=b;
	this._bmd.ctx.strokeStyle = this._borderColor;
	//draw background
	if(!this._hasTexture){
		this._bmd.ctx.fillStyle=this._color;
		this._bmd.ctx.roundRect(b, b, w-2*b, h-2*b, r, true,'');
		this._bmd.ctx.fill();
		this._bmd.ctx.strokeBorder(b);
	}else{
		var texture = this._texture['bg'];
		this._bmd.generateNinePatchTexture(texture.key,0,0,w,h,r,texture.width,texture.height);
	}
	//draw text mask
	this._bmd.ctx.save();
	this._bmd.ctx.beginPath();
	this._bmd.ctx.rect(r+b,r+b,w-2*r-2*b,h-2*r-2*b);
	this._bmd.ctx.clip();
	this._bmd.ctx.closePath();
	//draw text
	this._bmd.ctx.font=font;
	this._bmd.ctx.fillStyle=fontcolor;
	this._bmd.ctx.textBaseline="top";
	var textwidth=getTextSize(this._font.family,this._font.size,this._text).width;
	var offset=Math.max(0,textwidth-w+2*r+2*b);
	this._bmd.ctx.fillText(this._text, r+b-offset,r+b);
	this._bmd.ctx.restore();
	//draw cursor
	this._bmd.ctx.fillStyle=fontcolor;
	if(this._focus && this._delay++%66<33){
		this._bmd.ctx.fillRect(this._cursor,r+b,1, h-2*r-2*b);
	}
}
TextInput.prototype.getCursorPos=function(pos){
	var sx=this.scale.x;
	var total=this._text.length;
	var nearest=total;
	var distance=getTextSize(this._font.family,this._font.size, this._text).width*sx;
	for(i=0;i<=total;i++){
		substr=this._text.substring(0,i);
		width=getTextSize(this._font.family,this._font.size, substr).width*sx;
		if(Math.abs(width-pos)<distance){
			nearest=i;
			distance=Math.abs(width-pos);
		}
	}
	return nearest;
}
TextInput.prototype.onInputDownHandler = function (sprite, pointer) {
	var self=this;
	this._state='down';
	var sx=this.scale.x;
	var b=this._border*sx;
	var r=this._radius*sx;
	var w=this._originWidth;
	var h=this._originHeight;
	var px=pointer.worldX-this.world.x-r-b;
	var textwidth=getTextSize(this._font.family,this._font.size,this._text).width;
	var offset=Math.max(0,textwidth*sx-w*sx+2*r+2*b);
	var pos=this.getCursorPos(px+offset);
	this._cursor=getTextSize(this._font.family,this._font.size,
								this._text.substring(0,pos)).width-offset+r+b;
	window.setTimeout(function (){
		self._hiddenInput.focus();
	}, 0);
	window.setTimeout(function (){
		self._hiddenInput.setSelectionRange(pos,pos);
	}, 0);
	GUIObject.prototype.onInputDownHandler.call(this,sprite,pointer);
};
TextInput.prototype.getType=function(){
	return 'textinput';
}
TextInput.prototype.getValue=function(){
	return this._value;
}
TextInput.prototype.setValue=function(value){
	this._value=value;
	this.fit();
}
