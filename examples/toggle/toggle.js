example_toggle={
  preload:function() {
  },
  create:function() {
    var button6=game.gui.add.toggle(100,100,"toggle");

    var btnMainState=game.gui.add.button(0,0,'main menu');
    btnMainState.onClick.add(function(){
      game.state.start('main');
    });
  }
}
