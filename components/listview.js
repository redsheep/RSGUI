
ListView = function (game, x, y, width, height) {

	GUIContainer.call(this, game, x, y, width, height);
	this._items=[];
	this._offset=0;
	this.onSwipe=new Phaser.Signal();
};
ListView.prototype = Object.create(GUIContainer.prototype);
ListView.prototype.constructor = ListView;
ListView.prototype.draw=function(){
	var b=this._border;
	var r=this._radius;
	var w=this._originWidth;
	var h=this._originHeight;

	this._bmd.cls();
	this._bmd.ctx.strokeStyle = this._borderColor;
	this._bmd.ctx.fillStyle= this._color;
	this._bmd.ctx.rect(b,b,w-b,h-b);
	this._bmd.ctx.fill();
	this._bmd.ctx.strokeBorder(b);
}
ListView.prototype.update = function() {
	if(this._state=='down'){
		var py=game.input.activePointer.position.y-game.input.activePointer.positionDown.y;
		for(i=0;i<this._items.length;i++){
			this._items[i].position.y=py*0.5+i*this._itemTheme['height']+this._offset;
		}
	}
	this._redraw=true;
	GUIContainer.prototype.update.call(this);
}
ListView.prototype.onInputUpHandler=function(sprite,pointer,isOver){
	this._offset=this._items[0].position.y;
	if(this._offset>0){
		for(i=0;i<this._items.length;i++){
			this._items[i].position.y=i*this._itemTheme['height'];
		}
		this._offset=0;
	}else{
		var minOffset=this._originHeight-this._items.length*this._itemTheme['height'];
		minOffset=Math.max(minOffset,this._offset);
		for(i=0;i<this._items.length;i++){
			this._items[i].position.y=i*this._itemTheme['height']+minOffset;
		}
		this._offset=minOffset;
	}
	GUIContainer.prototype.onInputUpHandler.call(this,sprite,pointer,isOver);
}
ListView.prototype.getType=function(){
	return 'listview';
}
ListView.prototype.setTheme=function(theme){
	GUIObject.prototype.setTheme.call(this,theme);
	this._itemTheme=theme['item'];
}
ListView.prototype.addItem=function(text){
	//var button = this.game.gui.add.button(0,this._items.length*40,text,this);
	var height=this._itemTheme['height'];
	var button = new Button(this.game,0,this._items.length*height,text);
	button.setTheme(this._itemTheme);
	button.resize(this.width,height);
	this.addChild(button);
	this._items.push(button);
	return button;
}
