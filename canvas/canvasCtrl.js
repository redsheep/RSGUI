function getTextSize(font,fontSize,text,bold,warp){
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext('2d');
    ctx.font = fontSize+"px Arial";
    var width=ctx.measureText(text).width;
    var size = {width:width, height:fontSize};
    if(warp!=null)
        if(width>warp)
            size={width:warp,height:(Math.floor(width/warp)+1)*fontSize};
    return size;
}
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
CanvasRenderingContext2D.prototype.warpText= function(text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';

    for(var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = this.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            this.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        }
        else {
            line = testLine;
        }
    }
    this.fillText(line, x, y);
}
Phaser.BitmapData.prototype.generateNinePatchTexture=
function(tex,x,y,w,h,r,W,H){
	var mw=w-2*r;
	var mh=h-2*r;
	var mW=W-2*r;
	var mH=H-2*r;
	this.copy(tex,0,0,r,r,x,y);
	this.copy(tex,W-r,0,r,r,w-r+x,y);
	this.copy(tex,W-r,H-r,r,r,w-r+x,h-r+y);
	this.copy(tex,0,H-r,r,r,x,h-r+y);

	this.copy(tex,r,0,mW,r,x+r,y,mw,r);
	this.copy(tex,r,H-r,mW,r,x+r,h-r+y,mw,r);
	this.copy(tex,0,r,r,mH,x,y+r,r,mh);
	this.copy(tex,W-r,r,r,mH,w-r+x,y+r,r,mh);
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
CanvasCtrlFactory = function(game){
	this.gui=null;//new Phaser.Group(game);
	this.game=game;
  this.theme=this.getDefaultTheme();
}
CanvasCtrlFactory.prototype = {
	window:function(x,y,width,height,title,container){
		var object = new Window(this.game,x,y,width,height,title);
		this.addToGroup(container,object);
		return object;
	},
	button:function(x,y,text,container){
		var object = new CustomizeButton(this.game,x,y,12,0,text);
		this.addToGroup(container,object);
		return object;
	},
	checkbox:function(x,y,text,container){
		var object = new CheckBox(this.game,x,y,5,1,text);
		this.addToGroup(container,object);
		return object;
	},
	label:function(x,y,text,container){
		var object = new Phaser.Text(this.game,x,y,text);
		this.addToGroup(container,object);
		return object;
	},
	textinput:function(x,y,text,container){
		var object = new TextInput(this.game,x,y,10,1,text);
		this.addToGroup(container,object);
		return object;
	},
	scrollbar:function(x,y,container){
		var object = new ScrollBar(this.game,x,y,10,1);
		this.addToGroup(container,object);
		return object;
	},
	dropdown:function(x,y,container){
		var object = new DropDown(this.game,x,y,10,1);
		this.addToGroup(container,object);
		return object;
	},
	radiobox:function(x,y,text,container){
		var object = new RadioBox(this.game,x,y,10,1,text);
		this.addToGroup(container,object);
		return object;
	},
	toggle:function(x,y,container){
		var object = new ToggleButton(this.game,x,y,10,1);
		this.addToGroup(container,object);
		return object;
	},
	tooltip:function(x,y,container){
		var object = new ToolTip(this.game,x,y,10,1);
		this.addToGroup(container,object);
		return object;
	},
  addToGroup:function(container,object){
    if(container==null)
      this.game.world.add(object);
    else
      container.addChild(object);
  },
  getDefaultTheme:function(){

  },
  setTheme:function(theme){
    this.theme=theme
  }
}
CanvasCtrlFactory.prototype.constructor = CanvasCtrlFactory;
