var game = new Phaser.Game(480, 320, Phaser.CANVAS, '');
game.gui=new RSGUI(game);

var example_main={
  preload:function(){

  },
  create:function(){
    game.stage.backgroundColor = 0xeeeeee;
    game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    game.scale.refresh();

    var listview=game.gui.add.listview(0,0,480,320);
    listview.setBGColor(0x999999);

    this.addMenuButton("label",listview);
    this.addMenuButton("button",listview);
    this.addMenuButton("checkbox",listview);
    this.addMenuButton("radiobox",listview);
    this.addMenuButton("dropdown",listview);
    this.addMenuButton("scrollbar",listview);
    this.addMenuButton("processbar",listview);
    this.addMenuButton("textinput",listview);
    this.addMenuButton("tooltip",listview);
    this.addMenuButton("toggle",listview);
    this.addMenuButton("window",listview);
    this.addMenuButton("listview",listview);

  },
  addMenuButton:function(state,container){
    var btnSelectState = container.addItem(state);
    btnSelectState.onClick.add(function(){
      game.state.start(state);
    });
  }
}
game.state.add('main',example_main);
game.state.add('button',example_button);
game.state.add('checkbox',example_checkbox);
game.state.add('radiobox',example_radiobox);
game.state.add('dropdown',example_dropdown);
game.state.add('scrollbar',example_scrollbar);
game.state.add('processbar',example_processbar);
game.state.add('tooltip',example_tooltip);
game.state.add('toggle',example_toggle);
game.state.add('window',example_window);
game.state.add('textinput',example_textinput);
game.state.add('label',example_label);
game.state.start('main');
