function getTextSize(font,fontSize,text,bold,warp){
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext('2d');
    ctx.font = fontSize+"px "+font;
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
    object.setTheme(this.theme.window);
		return object;
	},
  listview:function(x,y,width,height,container){
		var object = new ListView(this.game,x,y,width,height);
		this.addToGroup(container,object);
    //object.setTheme(this.theme.listview);
		return object;
	},
	button:function(x,y,text,container){
		var object = new Button(this.game,x,y,text);
		this.addToGroup(container,object);
    object.setTheme(this.theme.button);
		return object;
	},
	checkbox:function(x,y,text,container){
		var object = new CheckBox(this.game,x,y,text);
		this.addToGroup(container,object);
    object.setTheme(this.theme.checkbox);
		return object;
	},
	label:function(x,y,text,container){
		var object = new Phaser.Text(this.game,x,y,text);
		this.addToGroup(container,object);
		return object;
	},
	textinput:function(x,y,text,container){
		var object = new TextInput(this.game,x,y,text);
		this.addToGroup(container,object);
    object.setTheme(this.theme.textinput);
		return object;
	},
	scrollbar:function(x,y,container){
		var object = new ScrollBar(this.game,x,y);
		this.addToGroup(container,object);
    object.setTheme(this.theme.scrollbar);
		return object;
	},
	dropdown:function(x,y,text,container){
		var object = new DropDown(this.game,x,y,text);
		this.addToGroup(container,object);
    object.setTheme(this.theme.dropdown);
		return object;
	},
	radiobox:function(x,y,text,container){
		var object = new RadioBox(this.game,x,y,text);
		this.addToGroup(container,object);
    object.setTheme(this.theme.radiobox);
		return object;
	},
	toggle:function(x,y,text,container){
		var object = new ToggleButton(this.game,x,y);
		this.addToGroup(container,object);
    object.setTheme(this.theme.toggle);
		return object;
	},
	tooltip:function(x,y,text,container){
		var object = new ToolTip(this.game,x,y,text);
		this.addToGroup(container,object);
    object.setTheme(this.theme.tooltip);
		return object;
	},
  addToGroup:function(container,object){
    if(container==null)
      this.game.world.add(object);
    else
      container.addChild(object);
  },
  setTheme:function(theme){
    this.theme=theme;
  },
  getDefaultTheme:function(){
    return {
      'window':{
        'radius':10,
        'bgcolor':'#ddd',
        'headerheight':32,
        'headercolor':'#333',
        'border':'1px #ccc',
        'font':'Arial 16px #000'
      },
      'button':{
        'radius':10,
        'up':'#fff',
        'down':'#999',
        'border':'1px #ccc',
        'font':'Arial 16px #000'
      },
      'dropdown':{
        'radius':6,
        'bgcolor':'#fff',
        'select':'skyblue',
        'border':'1px #ccc',
        'font':'Arial 16px #000'
      },
      'checkbox':{
        'radius':5,
        'bgcolor':'#000',
        'check':'#fff',
        'border':'1px #ccc',
        'font':'Arial 16px #000'
      },
      'radiobox':{
        'radius':5,
        'bgcolor':'#000',
        'check':'#fff',
        'border':'1px #ccc',
        'font':'Arial 16px #000'
      },
      'scrollbar':{
        'radius':5,
        'bgcolor':'#000',
        'button':'#fff',
        'border':'1px #ccc',
        'font':'Arial 16px #000'
      },
      'textinput':{
        'radius':8,
        'bgcolor':'#fff',
        'border':'1px #ccc',
        'font':'Arial 16px #000'
      },
      'toggle':{
        'radius':10,
        'bgcolor':'#ccc',
        'button':'#999',
        'border':'1px #ccc',
        'font':'Arial 16px #000'
      },
      'tooltip':{
        'radius':8,
        'bgcolor':'#ccc',
        'border':'1px #ccc',
        'font':'Arial 16px #000'
      }
    }
  }
}
CanvasCtrlFactory.prototype.constructor = CanvasCtrlFactory;
