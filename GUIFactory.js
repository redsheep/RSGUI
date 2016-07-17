GUIFactory = function(game){
	this.game=game;
  this.theme=this.getDefaultTheme();
	this._theme_ready=true;
	this.queue=[];
	this.callbacks=[];
}

GUIFactory.prototype.constructor = GUIFactory;
GUIFactory.prototype = {
	window:function(x,y,width,height,title,container){
		var object = new Window(this.game,x,y,width,height,title);
		this.addToGroup(container,object);
    this.setObjectTheme(object,'window');
		return object;
	},
  listview:function(x,y,width,height,container){
		var object = new ListView(this.game,x,y,width,height);
		this.addToGroup(container,object);
    this.setObjectTheme(object,'listview');
		return object;
	},
	button:function(x,y,text,container){
		var object = new Button(this.game,x,y,text);
		this.addToGroup(container,object);
    this.setObjectTheme(object,'button');
		return object;
	},
	roundbutton:function(x,y,text,container){
		var object = new RoundButton(this.game,x,y,text);
		this.addToGroup(container,object);
    this.setObjectTheme(object,'button');
		return object;
	},
	checkbox:function(x,y,text,container){
		var object = new CheckBox(this.game,x,y,text);
		this.addToGroup(container,object);
    this.setObjectTheme(object,'checkbox');
		return object;
	},
	label:function(x,y,text,container){
		var object = new Label(this.game,x,y,text);
		this.addToGroup(container,object);
    this.setObjectTheme(object,'label');
		return object;
	},
	textinput:function(x,y,text,type,container){
		var object = new TextInput(this.game,x,y,text,type);
		this.addToGroup(container,object);
    this.setObjectTheme(object,'textinput');
		return object;
	},
	rating:function(x,y,stars,container){
		var object = new Rating(this.game,x,y,stars);
		this.addToGroup(container,object);
		this.setObjectTheme(object,'rating');
		return object;
	},
	scrollbar:function(x,y,width,height,type,container){
		var object = new ScrollBar(this.game,x,y,width,height,type);
		this.addToGroup(container,object);
    this.setObjectTheme(object,'scrollbar');
		return object;
	},
	processbar:function(x,y,width,height,type,container){
		var object = new ProcessBar(this.game,x,y,width,height,type);
		this.addToGroup(container,object);
    this.setObjectTheme(object,'processbar');
		return object;
	},
	dropdown:function(x,y,text,container){
		var object = new DropDown(this.game,x,y,text);
		this.addToGroup(container,object);
    this.setObjectTheme(object,'dropdown');
		return object;
	},
	radiobox:function(x,y,text,container){
		var object = new RadioBox(this.game,x,y,text);
		this.addToGroup(container,object);
    this.setObjectTheme(object,'radiobox');
		return object;
	},
	toggle:function(x,y,text,container){
		var object = new ToggleButton(this.game,x,y);
		this.addToGroup(container,object);
    this.setObjectTheme(object,'toggle');
		return object;
	},
	tooltip:function(x,y,text,direct,container){
		var object = new ToolTip(this.game,x,y,text,direct);
		this.addToGroup(container,object);
    this.setObjectTheme(object,'tooltip');
		return object;
	},
  addToGroup:function(container,object){
    if(container==null)
      this.game.world.add(object);
    else
      container.addChild(object);
  },
	setFont:function(font){

	},
  setTheme:function(theme){
		var self=this;
		this.loadWebFont(theme.webfont,function(){
			self.loadAsset(theme);
		});
  },
	waitTheme:function(){
		this._theme_ready=false;
	},
	themeReady:function(theme){
		this._theme_ready=true;
		for( key in theme){
			if(key=='webfont'||key=='path')continue;
			component=theme[key];
			for(property in component){
				this.theme[key][property]=component[property];
			}
		}
		for(var i=0;i<this.queue.length;i++){
			this.queue[i].obj.setTheme(this.theme[this.queue[i].type]);
		}
		this.queue=[];
		for(var i=0;i<this.callbacks.length;i++){
			this.callbacks[i]();
		}
		this.callbacks=[];
	},
	setObjectTheme:function(object,type){
		object.setTheme(this.theme[type]);
		if(!this._theme_ready){
			this.queue.push({obj:object,type:type});
		}
	},
	loadWebFont:function(fonts,activeCallback){
		var self=this;
		if(fonts==null){
			activeCallback();
		}else{
			webfontConfig={};
			if(fonts.google!=null) webfontConfig.google = fonts.google;
			if(fonts.custom!=null) webfontConfig.custom = fonts.custom;
			webfontConfig.active = activeCallback;
			WebFont.load(webfontConfig);
		}
	},
  loadAsset:function(theme){
		var numTextures=0;
  	var loader=new Phaser.Loader(this.game);
  	for(component in theme){
		if(typeof(theme[component])!='object')
			continue;
  		if('texture' in theme[component]){
  			texture = theme[component]['texture'];
  			for(key in texture){
  				assetkey = 'rsgui-'+component+'-'+key;
  				path = theme.path+texture[key];
  				loader.image(assetkey, path);
					numTextures++;
  			}
  		}
  	}
		if(numTextures>0){
			loader.onLoadComplete.addOnce(this.themeReady,this,0,theme);
	  	loader.start();
		}else{
			this.themeReady(theme);
		}
  },
	ready:function(callback){
		if(!this._theme_ready){
			this.callbacks.push(callback);
		}else{
			callback();
		}
	}
}
GUIFactory.prototype.getDefaultTheme=function(){
  return {
		'label':{
      'radius':10,
      'bgcolor':'#ddd',
      'headerheight':32,
      'headercolor':'#333',
      'border':'1px #fff',
			'font':'Arial 16px #000'
		},
    'window':{
      'radius':10,
      'bgcolor':'#ddd',
      'headerheight':32,
      'headercolor':'#333',
      'border':'1px #fff',
      'font':'Arial 16px #000'
    },
    'listview':{
      'radius':10,
      'bgcolor':'#ccc',
      'border':'0px #fff',
      'font':'Arial 16px #000',
			'item':{
	      'radius':5,
	      'height':40,
	      'border':'2px #fff',
	      'font':'Arial 16px #000'
	    },
    },
    'button':{
      'radius':10,
      'bgcolor':'#eee',
      'border':'2px #fff',
      'font':'Arial 16px #000'
    },
    'dropdown':{
      'radius':6,
      'bgcolor':'#fff',
      'select':'skyblue',
      'border':'2px #000',
      'font':'Arial 16px #000'
    },
    'checkbox':{
      'radius':3,
      'bgcolor':'#000',
      'check':'#fff',
      'border':'1px #fff',
      'font':'Arial 16px #000'
    },
    'radiobox':{
      'radius':3,
      'bgcolor':'#000',
      'check':'#fff',
      'border':'1px #fff',
      'font':'Arial 16px #000'
    },
    'scrollbar':{
      'radius':5,
      'bgcolor':'#000',
      'button':'#fff',
      'border':'2px #fff',
      'font':'Arial 16px #000'
    },
    'processbar':{
      'radius':5,
      'bgcolor':'#000',
      'button':'#fff',
      'border':'2px #fff',
      'font':'Arial 16px #000'
    },
    'textinput':{
      'radius':4,
      'bgcolor':'#fff',
      'border':'2px #000',
      'font':'Arial 16px #000'
    },
    'toggle':{
      'radius':10,
      'bgcolor':'#ccc',
	  	'toggle':'#fff',
      'button':'#999',
      'border':'2px #fff',
      'font':'Arial 16px #000'
    },
    'tooltip':{
      'radius':8,
      'bgcolor':'#ccc',
      'border':'2px #fff',
      'font':'Arial 16px #000'
    },
		'rating':{
      'radius':16,
      'bgcolor':'#ccc',
      'border':'2px #fff',
      'font':'Arial 16px #000'
		}
  }
}
