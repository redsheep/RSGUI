example_listview={
  preload:function() {
  },
  create:function() {
    var button10=game.gui.add.listview(240,10,100,100);
    var button11=game.gui.add.button(-20,0,"this is a wide button",button10);
    var button12=game.gui.add.button(-20,40,"this is a wide button",button10);

    var btnMainState=game.gui.add.button(0,0,'main menu');
    btnMainState.onClick.add(function(){
      game.state.start('main');
    });
  }
}
