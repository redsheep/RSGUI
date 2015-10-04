RSCanvasGUI = function(game){
	//Phaser.Group.call(this, game);
	this.add = new CanvasCtrlFactory(game.world,game);
	//this.asset = new AssetCtrlFactory(game.world,game);
	//this.game.world.add(this);
}
//RSCanvasGUI.prototype = Object.create(Phaser.Group.prototype);
RSCanvasGUI.prototype.constructor = RSCanvasGUI;

AssetCtrl = function(game){
	//Phaser.Group.call(this, game);
	this.game = game;
	this.add = null;
	//this.asset = new AssetCtrlFactory(game.world,game);
	//this.game.world.add(this);
}
//RSCanvasGUI.prototype = Object.create(Phaser.Group.prototype);
AssetCtrl.prototype.constructor = AssetCtrl;
AssetCtrl.prototype.loadAsset=function(){
	var self=this;
	this.game.load.image('rsgui-button-up', this.theme.button.up.path);
	this.game.load.image('rsgui-button-down', this.theme.button.down.path);
	this.game.load.image('rsgui-check-on', this.theme.checkbox.on.path);
	this.game.load.image('rsgui-check-off', this.theme.checkbox.off.path);
	this.game.load.image('rsgui-scroll-bg', this.theme.scrollbar.bg.path);
	this.game.load.image('rsgui-scroll-btn', this.theme.scrollbar.button.path);
	this.game.load.image('rsgui-window-bg', this.theme.window.bg.path);
	this.game.load.image('rsgui-window-title', this.theme.window.title.path);
	this.game.load.onLoadComplete.addOnce(function(){
		self.add=new AssetCtrlFactory(self.game,self.theme);
	})
}
AssetCtrl.prototype.loadTheme=function(url){
	var self=this;
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', url, true); // Replace 'my_data' with the path to your file
	xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 && xobj.status == "200") {
			// Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
			self.setImages(xobj.responseText);
		}
	};
	xobj.send(null);
}
AssetCtrl.prototype.setImages=function(data){
	this.theme = JSON.parse(data);
}
