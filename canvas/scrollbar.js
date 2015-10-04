//  Here is a custom game object
ScrollBar = function (game, x, y,radius, border) {

	this._border=border;
	var height=2*border+2*radius+120;
	var width=2*border+2*radius+0;
	this._bmd = new Phaser.BitmapData(game, '', width, height);
	GUIObject.call(this, game, x, y, width, height);

	this._radius=radius;
	this._position=0;
	this._range={minvalue:0,maxvalue:100};
	this._buttonheight=width-2*border+10;

};
ScrollBar.prototype = Object.create(GUIObject.prototype);
ScrollBar.prototype.constructor = ScrollBar;
ScrollBar.prototype.update = function() {
	var b=this._border;
	var r=this._radius;
	var w=this.width;
	var h=this.height;
	var p=this._position;
	var bh=this._buttonheight;
	this.draw();
	if(this._state=='buttondown'){
		var py=this.game.input.worldY-this.parent.y;//-this.y;
		this._position=Math.min(Math.max(py,this.y+w/2+b),this.y+h-w/2-b-bh)-this.y-w/2-b;
	}
};
ScrollBar.prototype.draw=function(){
	var b=this._border;
	var r=this._radius;
	var w=this.width;
	var h=this.height;
	var p=this._position;
	this._bmd.cls();
	//draw scroll bar
	this._bmd.ctx.beginPath();
	var grd = this._bmd.ctx.createLinearGradient(0, 0, w, 0);
	grd.addColorStop(0, '#333');
	grd.addColorStop(0.5, '#666');
	grd.addColorStop(1.0, '#333');
	this._bmd.ctx.fillStyle = grd;
	this._bmd.ctx.roundRect(0, 0, w, h, r, true);
	//this._bmd.ctx.fill();
	//draw scroll bar button
	this._bmd.ctx.beginPath();
	this._bmd.ctx.fillStyle = "#fff"
	this._bmd.ctx.roundRect(b+r/4, p+b+w/2, w-2*b-r/2, w-2*b+10, r/2, true);
	//this._bmd.ctx.fill();
	//draw scroll bar up button
	this._bmd.ctx.beginPath();
	this._bmd.ctx.moveTo(w/2,b);
	this._bmd.ctx.lineTo(b+1,w/2);
	this._bmd.ctx.lineTo(w-b-2,w/2);
	this._bmd.ctx.closePath();
	//this._bmd.ctx.stroke();
	this._bmd.ctx.fill();
	//draw scroll bar down button
	this._bmd.ctx.beginPath();
	this._bmd.ctx.moveTo(w/2,h-b);
	this._bmd.ctx.lineTo(b+1,h-b-w/2);
	this._bmd.ctx.lineTo(w-b-2,h-b-w/2);
	this._bmd.ctx.closePath();
	//this._bmd.ctx.stroke();
	this._bmd.ctx.fill();

}
/**
* Internal function that handles input events.
*
* @method Phaser.Button#onInputDownHandler
* @protected
* @param {Phaser.Button} sprite - The Button that the event occurred on.
* @param {Phaser.Pointer} pointer - The Pointer that activated the Button.
*/
ScrollBar.prototype.onInputDownHandler = function (sprite, pointer) {
	var b=this._border;
	var r=this._radius;
	var w=this.width;
	var h=this.height;
	var p=this._position;
	var bh=this._buttonheight;
	var offsety=this.parent.y;
    this._state='down';
	if(pointer.worldY<offsety+this.y+this.width/2){
		this._position=Math.max(p-1,0);
	}else if(pointer.worldY<offsety+this.y+h-w/2){
		if(pointer.worldY<offsety+this.y+p+b+w/2){
			this._position=Math.max(p-1,0);
		}else if(pointer.worldY>offsety+this.y+p+bh+b+w/2){
			this._position=Math.max(p+1,0);
		}else{
			this._state='buttondown';
		}
	}else{
		this._position=Math.max(p+1,0);
	}

    if (this.onInputDown)
    {
        this.onInputDown.dispatch(this, pointer);
    }
};
