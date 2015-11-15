
RadioBox = function (game, x, y, text) {
	GUIObject.call(this, game, x, y);

	this._seprate=2;
	this._text=text;
	this._check=false;
	this._onFrame = "rsgui-checkbox-on";
	this._offFrame = "rsgui-checkbox-off";
	this._frame='off';
	this.onChange =new Phaser.Signal();
};
RadioBox.prototype = Object.create(GUIObject.prototype);
RadioBox.prototype.constructor = CheckBox;
RadioBox.prototype.draw=function(){
	var b=this._border;
	var r=this._radius;
	var w=this._originWidth;
	var h=this._originHeight;
	var c=h+this._seprate;
	var fontcolor=this._font.color;
	var font=this.getFont();

	this._bmd.cls();
	this._bmd.ctx.strokeStyle = this._borderColor;
	if(!this._hasTexture){
		this._bmd.ctx.fillStyle= this._color;
		this._bmd.ctx.arc(h/2,h/2,h/3,0,2*Math.PI);
		this._bmd.ctx.fill();
		if(this._check){
			this._bmd.ctx.fillStyle= this._checkColor;
			this._bmd.ctx.beginPath();
			this._bmd.ctx.arc(h/2,h/2,h/5,0,2*Math.PI);
			this._bmd.ctx.closePath();
			this._bmd.ctx.fill();
		}
	}else{
		var texture = this._texture[this._frame];
		this._bmd.copy(texture.key,0,0,texture.width,texture.height,0,0,h,h);
	}
	this._bmd.ctx.font=font;
	this._bmd.ctx.fillStyle=fontcolor;
	this._bmd.ctx.textBaseline="middle"
	this._bmd.ctx.fillText(this._text, c, h/2);
}
RadioBox.prototype.onInputDownHandler = function (sprite, pointer) {
	if(this._check) this.uncheck();
	else this.check();
	GUIObject.prototype.onInputDownHandler.call(this,sprite,pointer);
};
RadioBox.prototype.getType=function(){
	return 'radiobox';
}
RadioBox.prototype.check=function(){
	this._check=true;
	this._frame='on';
	if(this.parent!=null){
		for(i=0;i<this.parent.children.length;i++){
			var child=this.parent.children[i];
			if(child!=this &&child.group==this.group){
				if(child instanceof RadioBox) child.uncheck();
			}
		}
	}
}
RadioBox.prototype.uncheck=function(){
	this._check=false;
	this._frame='off';
}
RadioBox.prototype.setTheme=function(theme){
	this._checkColor=theme.check;
	this._extendWidth=this._font.size+this._seprate;
	GUIObject.prototype.setTheme.call(this,theme);
}
RadioBox.prototype.getValue=function(){
	return this._check;
}
RadioBox.prototype.setText=function(text){
	this._text=text;
	this.fit();
}
