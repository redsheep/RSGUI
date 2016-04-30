example_scrollbar={
  preload:function() {
  },
  create:function() {
    var vertical=game.gui.add.scrollbar(350,10,20,180,'vertical');
    var horizontal=game.gui.add.scrollbar(20,180,300,20,'horizontal');

    vertical.onChange.add(function(){
      console.log("vertical scroll");
    });
    horizontal.onChange.add(function(){
      console.log("horizontal scroll");
    });

    var btnMainState=game.gui.add.button(0,0,'main menu');
    btnMainState.onClick.add(function(){
      game.state.start('main');
    });
  }
}
