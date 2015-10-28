//  Here is a custom game object
GUIObject = function (game, x, y, width, height) {
	//width=256||width;
	//height=256||height;
	this._bmd=new Phaser.BitmapData(game, '', width, height);
	Phaser.Sprite.call(this, game, x ,y, this._bmd);
	//this.game.world.addChild(this._inputHandler);
	this._hasTexture=false;

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
	this._value;
	this._font={'family':'Arial','size':16,'color':'#000'};
	this.inputEnabled = true;
	//Redirect the input events to here so we can handle animation updates, etc
	//this.events.onInputOver.add(this.onInputOverHandler, this);
	//this.events.onInputOut.add(this.onInputOutHandler, this);
	this.events.onInputDown.add(this.onInputDownHandler, this);
	this.events.onInputUp.add(this.onInputUpHandler, this);

	this.onMove  	= new Phaser.Signal();
	this.onResize = new Phaser.Signal();
	this.onChange = new Phaser.Signal();
	this.onFocus	= new Phaser.Signal();
	this.onBlur		= new Phaser.Signal();
};
GUIObject.prototype = Object.create(Phaser.Sprite.prototype);
GUIObject.prototype.constructor = GUIObject;
GUIObject.prototype.update = function() {
	if(this._hasTexture)
		this.drawTexture();
	else
		this.drawCanvas();
};

GUIObject.prototype.drawTexture=function(){ }

GUIObject.prototype.drawCanvas=function(){ }

GUIObject.prototype.onInputOverHandler = function (sprite, pointer) {
	//  If the Pointer was only just released then we don't fire an over event
	if (pointer.justReleased())
	{
		return;
	}
	if (this.onOverMouseOnly && !pointer.isMouse)
	{
		return;
	}
	if (this.onInputOver)
	{
		this.onInputOver.dispatch(this, pointer);
	}
	this._state='over';
};

GUIObject.prototype.onInputOutHandler = function (sprite, pointer) {
	this._state='up';
	if (this.onInputOut)
	{
		this.onInputOut.dispatch(this, pointer);
	}
};

GUIObject.prototype.onInputDownHandler = function (sprite, pointer) {

	if (this.onInputDown)
	{
		this.onInputDown.dispatch(this, pointer);
	}
	this._state='down';
	this.focus();
};

GUIObject.prototype.onInputUpHandler = function (sprite, pointer, isOver) {
	//  Input dispatched early, before state change (but after sound)

	if (this.onInputUp)
	{
		this.onInputUp.dispatch(this, pointer, isOver);
	}
	if (this.freezeFrames)
	{
		return;
	}
	this._state='up';
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
	this.onFocus.dispatch();
}
GUIObject.prototype.blur=function(){
	this._focus=false;
	this.onBlur.dispatch();
}
GUIObject.prototype.getProperty=function(property){
	dict={};
	data = property.split(' ');
	for(i=0;i<data.length;i++){
		if(data[i].indexOf('#')!=-1)
			dict.color=data[i];
		else if(data[i].indexOf('px')!=-1)
			dict.size=parseInt(data[i].substring(0,data[i].length-2));
		else
			dict.family=data[i];
	}
	return dict;
}
GUIObject.prototype.setTheme=function(theme){
	this._radius=theme.radius;
	this._color=theme.bgcolor;
	this._border=this.getProperty(theme.border).size;
	this._borderColor=this.getProperty(theme.border).color;
	this._font=this.getProperty(theme.font);
	this.setFont(this._font);
	if(theme.texture!=null)
		this._hasTexture=true;
}
GUIObject.prototype.setFont=function(font){
	this._font=font;
	txtsize=getTextSize(font.family,font.size,this._text);
	width = 2*this._radius+2*this._border+txtsize.width;
	height = 2*this._radius+2*this._border+txtsize.height;
	this.resize(parseInt(width),parseInt(height));
}
GUIObject.prototype.resize=function(width,height){
	this._originWidth=width+this._extendWidth;
	if(this._minWidth!=null && this._originWidth<this._minWidth)
		this._originWidth=this._minWidth;
	this._originHeight=height+this._extendHeight;
	this._bmd.resize(this._originWidth,this._originHeight);
	this.onResize.dispatch();
}
GUIObject.prototype.getFont=function(){
	return this._font.size+'px '+this._font.family;
}
GUIObject.prototype.setBGColor=function(color){
	this._color=color;
}