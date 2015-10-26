RSCanvasGUI = function(game){
	//Phaser.Group.call(this, game);
	this.add = new CanvasCtrlFactory(game);
	//this.asset = new AssetCtrlFactory(game.world,game);
	//this.game.world.add(this);
}
//RSCanvasGUI.prototype = Object.create(Phaser.Group.prototype);
RSCanvasGUI.prototype.constructor = RSCanvasGUI;

RSCanvasGUI.prototype.loadTheme=function(url){
	var self=this;
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', url, true); // Replace 'my_data' with the path to your file
	xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 && xobj.status == "200") {
			// Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
			theme=JSON.parse(xobj.responseText);
			self.add.setTheme(theme);
		}
	};
	xobj.send(null);
}
RSCanvasGUI.prototype.loadAsset=function(){
	this.add.loadAsset();
}
CanvasCtrlFactory = function(game){
	//Phaser.Group.call(this, game);
	this.game = game;
	//this.add=new CanvasCtrlFactory(game);
	//this.asset = new AssetCtrlFactory(game.world,game);
	//this.game.world.add(this);
}
//RSCanvasGUI.prototype = Object.create(Phaser.Group.prototype);
CanvasCtrlFactory.prototype.constructor = CanvasCtrlFactory;
