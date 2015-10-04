Phaser.BitmapData.prototype.generateNinePatchTexture=
function(tex,x,y,w,h,r,W,H){
	var mw=w-2*r;
	var mh=h-2*r;
	var mW=W-2*r;
	var mH=H-2*r;
	this.copy(tex,0,0,r,r,x,y);
	this.copy(tex,W-r,0,r,r,w-r,y);
	this.copy(tex,W-r,H-r,r,r,w-r,h-r);
	this.copy(tex,0,H-r,r,r,x,h-r);

	this.copy(tex,r,0,mW,r,x+r,0,mw,r);
	this.copy(tex,r,H-r,mW,r,x+r,h-r,mw,r);
	this.copy(tex,0,r,r,mH,0,y+r,r,mh);
	this.copy(tex,W-r,r,r,mH,w-r,y+r,r,mh);
	this.copy(tex,r,r,mW,mH,x+r,y+r,mw,mh);
}
Phaser.BitmapData.prototype.generateThreePatchTexture=
function(tex,x,y,w,h,r,W,H){
	var mw=w-2*r;
	var mh=h-2*r;
	var mW=W-2*r;
	var mH=H-2*r;
	this.copy(tex,0,0,r,H,x,y,r,h);
	this.copy(tex,r,0,mW,H,x+r,y,mw,h);
	this.copy(tex,W-r,0,r,H,x+w-r,y,r,h);
}
AssetCtrlFactory = function(game,theme){
	this.gui=game.world;
	this.game=game;
	this.theme=theme;
}
AssetCtrlFactory.prototype = {
	window:function(x,y,width,height,title,container){
		var object = new AssetCtrl.Window(this.game,this.theme,x,y,width,height,title);
		if(container==null)this.gui.addChild(object);
		else container.addChild(object);
		return object;
	},
	button:function(x,y,text,container){
		var object = new AssetCtrl.CustomizeButton(this.game,this.theme,x,y,10,1,text);
		if(container==null)this.gui.addChild(object);
		else container.addChild(object);
		return object;
	},
	checkbox:function(x,y,text,container){
		var object = new AssetCtrl.CheckBox(this.game,this.theme,x,y,10,1,text);
		if(container==null)this.gui.addChild(object);
		else container.addChild(object);
		return object;
	},
	label:function(x,y,text,container){
		return null;
	},
	textinput:function(x,y,text,container){
		var object = new AssetCtrl.TextInput(this.game,this.theme,x,y,10,1);
		if(container==null)this.gui.addChild(object);
		else container.addChild(object);
		return object;
	},
	scrollbar:function(x,y,container){
		var object = new AssetCtrl.ScrollBar(this.game,this.theme,x,y,10,1);
		if(container==null)this.gui.addChild(object);
		else container.addChild(object);
		return object;
	}
}
AssetCtrlFactory.prototype.constructor = AssetCtrlFactory;
