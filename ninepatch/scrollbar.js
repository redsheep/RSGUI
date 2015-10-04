AssetCtrl.ScrollBar = function(game, theme, x, y, radius, border) {

	//var style = { font: "bold 16px Arial", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle" };
	//this._text = new Phaser.Text(game, 0, 0, text, style);
	height=32;//2*radius+this._text.height;
	width=180;//2*radius+this._text.width;
	this._bmd = new Phaser.BitmapData(game, '', width, height);
	GUIObject.call(this, game, x, y, width, height);
	//this._button = new Phaser.Sprite(game, x, y, this._bmd);

	this._bgFrame = "rsgui-scroll-bg";
	this._btnFrame = "rsgui-scroll-btn";
	//this._frame=this._upFrame;

	this._position=0;
	this._range={minvalue:0,maxvalue:100};
	this._buttonheight=32;
};
AssetCtrl.ScrollBar.prototype = Object.create(GUIObject.prototype);
AssetCtrl.ScrollBar.prototype.constructor = AssetCtrl.ScrollBar;
AssetCtrl.ScrollBar.prototype.update = function() {
	var b=this._border;
	var r=this._radius;
	var w=this.width;
	var h=this.height;
	var p=this._position;
	var bh=this._buttonheight;
	var offset=this.parent.x;
	var localp=this.x;
	var worldp=this.game.input.worldX;
	this.draw();
	if(this._state=='buttondown'){
		var px=worldp-offset-localp;//-this.y;
		this._position=Math.min(Math.max(px,localp),localp+w-32)+this._inneroffset;
	}
};

AssetCtrl.ScrollBar.prototype.draw=function(){
	this._bmd.cls();
	var x=0;
	var y=0;
	var w=this.width;
	var h=this.height;
	var r=5;//this._radius;
	var W=this.game.cache.getImage(this._bgFrame).width;
	var H=this.game.cache.getImage(this._bgFrame).height;
	this._bmd.generateThreePatchTexture(this._bgFrame,x,y+8,w,16,r,W,H);
	var TW=this.game.cache.getImage(this._btnFrame).width;
	var TH=this.game.cache.getImage(this._btnFrame).height;
	var TX=this._position;
	this._bmd.copy(this._btnFrame,0,0,TW,TH,TX,0,32,32);
	//this._bmd.draw(this._text, r, r, null, null, 'normal');
}
/**
* Internal function that handles input events.
*
* @method Phaser.Button#onInputDownHandler
* @protected
* @param {Phaser.Button} sprite - The Button that the event occurred on.
* @param {Phaser.Pointer} pointer - The Pointer that activated the Button.
*/
AssetCtrl.ScrollBar.prototype.onInputDownHandler = function (sprite, pointer) {
	var b=0;//this._border;
	var r=0;//this._radius;
	var w=this.width;
	var h=this.height;
	var p=this._position;
	var bh=32;//this._buttonheight;
	var offset=this.parent.x;
	var localp=this.x;
	var worldp=pointer.worldX;
  this._state='down';
	if(worldp<offset+localp){
		this._position=Math.max(p-1,0);
		console.log('press -1');
	}else if(worldp<offset+localp+w){
		if(worldp<offset+localp+p+b){
			this._position=Math.max(p-1,0);
			console.log('press -1');
		}else if(worldp>offset+localp+p+bh+b){
			this._position=Math.max(p+1,0);
			console.log('press +1');
		}else{
			this._state='buttondown';
			this._inneroffset=offset+localp+p-worldp;
			console.log('press button');
		}
	}else{
		this._position=Math.max(p+1,0);
		console.log('press +1');
	}

    if (this.onInputDown)
    {
        this.onInputDown.dispatch(this, pointer);
    }
};
