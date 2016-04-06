example_processbar={
  preload:function() {
  },
  create:function() {
    var processbar = game.gui.add.processbar(50,100,200,30);
    processbar.setValue(0,100);
    processbar.setValue(100);

    var btnMainState=game.gui.add.button(0,0,'main menu');
    btnMainState.onClick.add(function(){
      game.state.start('main');
    });
  }
}
