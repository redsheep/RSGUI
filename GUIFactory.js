GUIFactory = function(game){
	this.game=game;
    this.theme=this.getDefaultTheme();
}

GUIFactory.prototype.constructor = GUIFactory;
GUIFactory.prototype = {
	window:function(x,y,width,height,title,container){
		var object = new Window(this.game,x,y,width,height,title);
		this.addToGroup(container,object);
    object.setTheme(this.theme.window);
		return object;
	},
  listview:function(x,y,width,height,container){
		var object = new ListView(this.game,x,y,width,height);
		this.addToGroup(container,object);
    object.setTheme(this.theme.listview);
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
	rating:function(x,y,stars,container){
		var object = new Rating(this.game,x,y,stars);
		this.addToGroup(container,object);
		object.setTheme(this.theme.rating);
		return object;
	},
	scrollbar:function(x,y,width,height,type,container){
		var object = new ScrollBar(this.game,x,y,width,height,type);
		this.addToGroup(container,object);
    object.setTheme(this.theme.scrollbar);
		return object;
	},
	processbar:function(x,y,width,height,type,container){
		var object = new ProcessBar(this.game,x,y,width,height,type);
		this.addToGroup(container,object);
    object.setTheme(this.theme.processbar);
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
	for( key in theme)
		this.theme[key]=theme[key];
    //this.loadAsset();
  },
  loadAsset:function(){
  	//loader=new Phaser.Loader(this.game);
  	for(component in this.theme){
		if(typeof(this.theme[component])!='object')
			continue;
  		if('texture' in this.theme[component]){
  			texture = this.theme[component]['texture'];
  			for(key in texture){
  				assetkey = 'rsgui-'+component+'-'+key;
  				path = this.theme.path+texture[key];
  				this.game.load.image(assetkey, path);
  			}
  		}
  	}
  	//loader.start();
  }
}
GUIFactory.prototype.getDefaultTheme=function(){
  return {
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
      'font':'Arial 16px #000'
    },
    'button':{
      'radius':10,
      'up':'#fff',
      'down':'#999',
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
