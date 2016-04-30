example_window={
  preload:function() {
  },
  create:function() {
    var mywin=game.gui.add.window(240,150,400,240,"window");
    mywin.input.enableDrag();

    var btnMainState=game.gui.add.button(0,0,'main menu');
    btnMainState.onClick.add(function(){
      game.state.start('main');
    });
  }
}
