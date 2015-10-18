//  Here is a custom game object
DropDown = function (game, x, y, radius, border, text) {

    this._text=text;
    var txtsize=getTextSize('Arial',16,text);
	var height=2*radius+2*border+txtsize.height;
	var width=2*radius+2*border+txtsize.width+32;
	GUIObject.call(this, game, x, y, width, height, text);

	this._border=border;
	this._radius=radius;
	this._dropdown=false;
    this._options=['option1','option2', 'option3'];
    this._selected=this._options[0];
    this._over=0;
    this._outbounds=true;
};
DropDown.prototype = Object.create(GUIObject.prototype);
DropDown.prototype.constructor = DropDown;
DropDown.prototype.update = function() {
	this.draw();
    var textheight=getTextSize('Arial',16, this._options[0]).height;
    var py=this.game.input.worldY-this.parent.y-this.y-2*this._radius-2*this._border-textheight;
    this._over=Math.floor(py/textheight);
    if(this._over<0 || this._over> this._options.length)
        this._outbounds=true;
    else this._outbounds=false;
    this._over=Math.min(Math.max(this._over,0), this._options.length-1);
};
DropDown.prototype.draw=function(){
	var b=this._border;
	var r=this._radius;
    var w=this.width/this.scale.x;
    var h=this.height/this.scale.y;
    var textheight=16;
	this._bmd.cls();
	this._bmd.ctx.strokeStyle = "#999";
	this._bmd.ctx.fillStyle= "#fff";
	this._bmd.ctx.roundRect(b, b, w-2*b, 2*r+textheight, r, true);
    this._bmd.ctx.beginPath();
    this._bmd.ctx.moveTo(w-r-b-16,r+b+4);
    this._bmd.ctx.lineTo(w-r-b, r+b+4);
    this._bmd.ctx.lineTo(w-r-b-8, r+b+textheight-4);
    this._bmd.ctx.closePath();
	this._bmd.ctx.strokeStyle = "#999";
    this._bmd.ctx.stroke();
    this._bmd.ctx.fillStyle="#999";
    this._bmd.ctx.fill();
	this._bmd.ctx.font="16px Arial";
    this._bmd.ctx.fillStyle="#000";
    this._bmd.ctx.textBaseline="top"
	if(this._dropdown){
        this._bmd.ctx.fillStyle='#fff';
        this._bmd.ctx.roundRect(b,2*r+2*b+ textheight,w-2*b, textheight*this._options.length+ 2*r+2*b, r, true);
        this._bmd.ctx.fillStyle="skyblue";
        this._bmd.ctx.fillRect(b,r+b+ this._over*textheight+2*r+2*b+textheight,w-2*b,textheight);
        this._bmd.ctx.fillStyle="black";
        for(i=0;i<this._options.length;i++)
		this._bmd.ctx.fillText(this._options[i], r+b, (r+b)+i*textheight+2*r+2*b+textheight);
	}
    this._bmd.ctx.fillText(this._selected, r+b, r+b);
}
DropDown.prototype.onInputDownHandler = function (sprite, pointer) {
    var b=this._border;
	var r=this._radius;
    if(this._dropdown){
        if(!this._outbounds)
       this._selected=this._options[this._over];
		this._dropdown=false;
        this._bmd.resize(Math.floor(this.width), 2*r+2*b+16);
	}else{
		this._dropdown=true;
        this._bmd.resize(Math.floor(this.width), this.height+2*r+2*b+16*(this._options.length));
	}
    if (this.onInputDown)
    this.onInputDown.dispatch(this, pointer);
};
