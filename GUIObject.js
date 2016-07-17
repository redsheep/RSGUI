// base gui object
GUIObject = function (game, x, y, width, height) {
	//width=256||width;
	//height=256||height;
	this._bmd=new Phaser.BitmapData(game, '', width, height);
	Phaser.Sprite.call(this, game, x ,y, this._bmd);
	this._hasTexture=false;
	this._texture={};
	this._text=null;
	this._state='up';
	this._border=0;
	this._radius=1;
	this._originWidth=width;
	this._originHeight=height;
	this._extendWidth=0;
	this._extendHeight=0;
	this._minWidth=null;
	this._minHeight=null;
	this._borderColor='#ccc';
	this._focus=false;
	this._autofit=true;
	this._warp=false;
	this._font={'family':'Arial','size':16,'color':'#000'};
	this._enabled=true;
	this.inputEnabled = true;
	this._redraw=true;
	//Redirect the input events to here so we can handle animation updates, etc
	//this.events.onInputOver.add(this.onInputOverHandler, this);
	//this.events.onInputOut.add(this.onInputOutHandler, this);
	this.events.onInputDown.add(this.onInputDownHandler, this);
	this.events.onInputUp.add(this.onInputUpHandler, this);

	this.onResize	= new Phaser.Signal();
	this.onFocus	= new Phaser.Signal();
	this.onBlur		= new Phaser.Signal();
};
GUIObject.prototype = Object.create(Phaser.Sprite.prototype);
GUIObject.prototype.constructor = GUIObject;
GUIObject.prototype.update = function() {
	if(this._redraw){
		this.draw();
		this._redraw=false;
	}
};

GUIObject.prototype.draw=function(){ }

GUIObject.prototype.onInputOverHandler = function (sprite, pointer) {

	if (pointer.justReleased())	return;
	if (this.onOverMouseOnly && !pointer.isMouse) return;
	if (this.onInputOver)this.onInputOver.dispatch(this, pointer);
	this._state='over';
};

GUIObject.prototype.onInputOutHandler = function (sprite, pointer) {

	if (this.onInputOut)this.onInputOut.dispatch(this, pointer);
	this._state='up';
};

GUIObject.prototype.onInputDownHandler = function (sprite, pointer) {

	if (this.onInputDown)
		this.onInputDown.dispatch(this, pointer);
	this._state='down';
	this.focus();
	this._redraw=true;
};

GUIObject.prototype.onInputUpHandler = function (sprite, pointer, isOver) {

	if (this.onInputUp)
		this.onInputUp.dispatch(this, pointer, isOver);
	if (this.freezeFrames) return;
	this._state='up';
	this._redraw=true;
};
GUIObject.prototype.focus=function(){
	this._focus=true;
	if(this.parent!=null){
		for(i=0;i<this.parent.children.length;i++){
			var child=this.parent.children[i];
			if(child!=this && child.blur!=null){
				child.blur();
			}
		}
	}
	this.onFocus.dispatch(this);
}
GUIObject.prototype.blur=function(){
	this._focus=false;
	this.onBlur.dispatch(this);
}
GUIObject.prototype.getProperty=function(property){
	dict={};
	var match = property.match(/"([^"]+)"|'([^']+)'/);
	if(match) {
	  dict.family = match[0]; // -> How are you doing?
	  property=property.replace(match[0], '');
	  property=property.replace(/['"]+/g, '');
	}
	data = property.match(/\S+/g);
	if(data!=null){
		for(i=0;i<data.length;i++){
			if(data[i].indexOf('#')!=-1)
				dict.color=data[i];
			else if(data[i].indexOf('px')!=-1)
				dict.size=parseInt(data[i].substring(0,data[i].length-2));
			else
				dict.family=data[i];
		}
	}
	return dict;
}
GUIObject.prototype.setTheme=function(theme){
	if(theme==null) return;
	this._radius=theme.radius;
	this._color=theme.bgcolor;
	this.setBorder(theme.border,false);
	this.setFont(theme.font,false);
	if(theme.texture!=null){
		for(var key in theme.texture){
			var cacheKey="rsgui-"+this.getType()+'-'+key;
			this._texture[key]={}
			this._texture[key].key=cacheKey;
			this._texture[key].width=this.game.cache.getImage(cacheKey).width;
			this._texture[key].height=this.game.cache.getImage(cacheKey).height;
		}
		this._hasTexture=true;
	}
	this.fit(this._autofit);
}
GUIObject.prototype.setBorder=function(border,fit){
	if(typeof border != "object")
		border=this.getProperty(border);
	if(border.size!=null)this._border=border.size;
	if(border.color!=null)this._borderColor=border.color;
	if(fit!=false) this.fit();
}
GUIObject.prototype.setFont=function(font,fit){
	if(typeof font != "object")
		font=this.getProperty(font);
	for(key in font)this._font[key]=font[key];
	if(fit!=false) this.fit();
}
GUIObject.prototype.fit=function(){
	if(this._text==null) return;
	txtsize=getTextSize(this._font.family,this._font.size,this._text,this._warp);
	width = 2*this._radius+2*this._border+txtsize.width;
	height = 2*this._radius+2*this._border+txtsize.height;
	this.resize(parseInt(width),parseInt(height));
}
GUIObject.prototype.resize=function(width,height){
	this._originWidth=width+this._extendWidth;
	if(this._minWidth!=null && this._originWidth<this._minWidth)
		this._originWidth=this._minWidth;
	this._originHeight=height+this._extendHeight;
	if(this._minHeight!=null && this._originHeight<this._minHeight)
		this._originHeight=this._minHeight;
	this._bmd.resize(this._originWidth,this._originHeight);
	this._redraw=true;
	this.onResize.dispatch(this, width, height);
}
GUIObject.prototype.getFont=function(){
	return this._font.size+'px '+this._font.family;
}
GUIObject.prototype.setBGColor=function(color){
	this._color=color;
}
GUIObject.prototype.enable=function(){
	this._enabled=true;
	this.inputEnabled=true;
}
GUIObject.prototype.disable=function(){
	this._enabled=false;
	this.inputEnabled=false;
}
