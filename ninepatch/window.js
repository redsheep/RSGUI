//  Here is a custom game object
AssetCtrl.Window = function (game, theme, x, y, width, height, text) {

	this._text = new Phaser.Text(game, 0, 0, text, { font: "bold 16px Arial", fill: "#000"});

	GUIContainer.call(this, game, x, y+32, width, height);

	this._window_bg="rsgui-window-bg";
	this._window_title="rsgui-window-title";
	this._title_offset = theme.window.title.offset;
	this._panel_offset = theme.window.bg.offset;

	this._panel = game.add.sprite(x,y+32,this._bmd);
	this._titleBarbmd = new Phaser.BitmapData(game, '', width, 32);
	this._titleBar = game.add.sprite(x,y+this._title_offset,this._titleBarbmd);

	//this._titleBar.width=width;
	//this._titleBar.height=32;
	this._titleBar.inputEnabled = true;
	this._titleBar.input.enableDrag();
	//this.events.onInputOver.add(this.onInputOverHandler, this);
	//this.events.onInputOut.add(this.onInputOutHandler, this);
	this._titleBar.events.onInputDown.add(this.onInputDownHandler, this);
	this._titleBar.events.onInputUp.add(this.onInputUpHandler, this);
};
AssetCtrl.Window.prototype = Object.create(GUIContainer.prototype);
AssetCtrl.Window.prototype.constructor = AssetCtrl.Window;
AssetCtrl.Window.prototype.update = function() {
	this.draw();
	if(this._state=='down'){
		this.x=this._titleBar.x;
		this.y=this._titleBar.y+32-this._title_offset;
		this._panel.x=this.x;
		this._panel.y=this.y;
	}
	GUIContainer.prototype.update.call(this);
};
AssetCtrl.Window.prototype.draw=function(){
	this._bmd.cls();
	var x=0;var y=0;
	var w=this._width;
	var h=this._height;
	var r=32;//this._radius;
	var W=this.game.cache.getImage(this._window_bg).width;
	var H=this.game.cache.getImage(this._window_bg).height;
	this._bmd.generateNinePatchTexture(this._window_bg,x,y,w,h,r,W,H);
	var TW=this.game.cache.getImage(this._window_title).width;
	var TH=this.game.cache.getImage(this._window_title).height;
	var TX=this._width/2-TW/2;
	//this._titleBarbmd.copy(this._window_title,0,0,TW,TH,TX,0,TW,32);
	this._titleBarbmd.generateThreePatchTexture(this._window_title,x+32,y,w-64,32,TH,TW,TH);
	//this._bmd.draw(this._text, r, r, null, null, 'normal');
}
/**
* Internal function that handles input events.
*
* @method Phaser.Button#onInputOverHandler
* @protected
* @param {Phaser.Button} sprite - The Button that the event occurred on.
* @param {Phaser.Pointer} pointer - The Pointer that activated the Button.
*/
AssetCtrl.Window.prototype.onInputOverHandler = function (sprite, pointer) {

    //  If the Pointer was only just released then we don't fire an over event
    if (pointer.justReleased())
    {
        return;
    }

    this._state='over';

    if (this.onOverMouseOnly && !pointer.isMouse)
    {
        return;
    }

    if (this.onInputOver)
    {
        this.onInputOver.dispatch(this, pointer);
    }

};

/**
* Internal function that handles input events.
*
* @method Phaser.Button#onInputOutHandler
* @protected
* @param {Phaser.Button} sprite - The Button that the event occurred on.
* @param {Phaser.Pointer} pointer - The Pointer that activated the Button.
*/
AssetCtrl.Window.prototype.onInputOutHandler = function (sprite, pointer) {

    this._state='up';

    if (this.onInputOut)
    {
        this.onInputOut.dispatch(this, pointer);
    }
};

/**
* Internal function that handles input events.
*
* @method Phaser.Button#onInputDownHandler
* @protected
* @param {Phaser.Button} sprite - The Button that the event occurred on.
* @param {Phaser.Pointer} pointer - The Pointer that activated the Button.
*/
AssetCtrl.Window.prototype.onInputDownHandler = function (sprite, pointer) {

this._state='down';
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

/**
* Internal function that handles input events.
*
* @method Phaser.Button#onInputUpHandler
* @protected
* @param {Phaser.Button} sprite - The Button that the event occurred on.
* @param {Phaser.Pointer} pointer - The Pointer that activated the Button.
*/
AssetCtrl.Window.prototype.onInputUpHandler = function (sprite, pointer, isOver) {
    //  Input dispatched early, before state change (but after sound)
    this._state='up';
		if (this.onInputUp)
    {
        this.onInputUp.dispatch(this, pointer, isOver);
    }
    if (this.freezeFrames)
    {
        return;
    }
};
