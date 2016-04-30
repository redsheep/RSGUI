example_radiobox={
  preload:function() {
  },
  create:function() {
    var radio1=game.gui.add.radiobox(0,100,"option1");
    var radio2=game.gui.add.radiobox(0,120,"option2");
    var radio3=game.gui.add.radiobox(0,140,"option3");
    //radio1.group='group1';
    //radio2.group='group1';
    //radio3.group='group1';
    radio3.disable();
    radio3.onChange.add(function(){
      console.log("radiobox3");
    })

    var btnMainState=game.gui.add.button(0,0,'main menu');
    btnMainState.onClick.add(function(){
      game.state.start('main');
    });
  }
}
