CanvasRenderingContext2D.prototype.roundRect =
function(x, y, width, height, radius, fill, round, stroke) {
	if (typeof stroke == "undefined" ) {
		stroke = true;
	}
	if (typeof radius === "undefined") {
		radius = 5;
	}
	this.beginPath();
	if(round=='down'){
		this.moveTo(x, y);
		this.lineTo(x + width, y);
	}else{
		this.moveTo(x , y+ radius);
		this.quadraticCurveTo(x, y, x + radius, y);
		this.lineTo(x + width - radius, y);
		this.quadraticCurveTo(x + width, y, x + width, y + radius);
	}
	if(round=='up'){
		this.lineTo(x + width, y + height);
		this.lineTo(x, y + height);
	}else{
		this.lineTo(x + width, y + height - radius);
		this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
		this.lineTo(x + radius, y + height);
		this.quadraticCurveTo(x, y + height, x, y + height - radius);
	}
	this.closePath();
	if (stroke) {
		this.stroke();
	}
	if (fill) {
		this.fill();
	}
}
CanvasCtrlFactory = function(gui,game){
	this.gui=gui;
	this.game=game;
}
CanvasCtrlFactory.prototype = {
	window:function(x,y,width,height,title,container){
		var object = new Window(this.game,x,y,width,height,title);
		if(container==null)this.gui.addChild(object);
		else container.addChild(object);
		return object;
	},
	button:function(x,y,text,container){
		var object = new CustomizeButton(this.game,x,y,10,1,text);
		if(container==null)this.gui.addChild(object);
		else container.addChild(object);
		return object;
	},
	checkbox:function(x,y,text,container){
		var object = new CheckBox(this.game,x,y,10,1,text);
		if(container==null)this.gui.addChild(object);
		else container.addChild(object);
		return object;
	},
	label:function(x,y,text,container){
		return null;
	},
	textinput:function(x,y,text,container){
		var object = new TextInput(this.game,x,y,10,1);
		if(container==null)this.gui.addChild(object);
		else container.addChild(object);
		return object;
	},
	scrollbar:function(x,y,container){
		var object = new ScrollBar(this.game,x,y,10,1);
		if(container==null)this.gui.addChild(object);
		else container.addChild(object);
		return object;
	}
}
CanvasCtrlFactory.prototype.constructor = CanvasCtrlFactory;
