//  Here is a custom game object
ToggleButton = function (game, x, y, radius, border, text) {

    //this._text=text;
    //var txtsize=getTextSize('Arial',16,text);
	var height=2*radius+2*border+20; //+txtsize.height;
	var width=2*radius+2*border+48; //height+this._seprate+txtsize.width;
	GUIObject.call(this, game, x, y, width, height, text);

	this._border=border;
	this._radius=radius;
	this._check=false;
};
ToggleButton.prototype = Object.create(GUIObject.prototype);
ToggleButton.prototype.constructor = ToggleButton;
ToggleButton.prototype.update = function() {
	this.draw();
};
ToggleButton.prototype.draw=function(){
	var b=this._border;
	var r=this._radius;
    var w=this.width/this.scale.x;
    var h=this.height/this.scale.y;
    //var c=h+this._seprate;
	this._bmd.cls();
	this._bmd.ctx.strokeStyle = "#999";
	this._bmd.ctx.fillStyle= "#fff";
	this._bmd.ctx.roundRect(b, b, w-2*b, h-2*b, r, true);
	this._bmd.ctx.fillStyle= "#999";
	if(this._check){
		this._bmd.ctx.roundRect(b, b, 32, h-2*b, r, true);
	}else{
		this._bmd.ctx.roundRect(w-b-32, b, 32, h-2*b, r, true);
	}
	this._bmd.ctx.font="16px Arial";
    this._bmd.ctx.fillStyle="#fff";
    this._bmd.ctx.textBaseline="top"
    this._bmd.ctx.fillText("off", r+b, r+b);
    this._bmd.ctx.fillText("on", w-r-b-16, r+b);
}
ToggleButton.prototype.onInputDownHandler = function (sprite, pointer) {

    if(this._check){
		this._check=false;
	}else{
		this._check=true;
	}

    if (this.onInputDown)
    {
        this.onInputDown.dispatch(this, pointer);
    }
};
