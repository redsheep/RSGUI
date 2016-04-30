example_checkbox={
  preload:function() {
  },
  create:function() {
    var chkbox1=game.gui.add.checkbox(50,100,"option1");
    var chkbox2=game.gui.add.checkbox(50,120,"option2");
    var chkbox3=game.gui.add.checkbox(50,140,"option3");
    chkbox1.group='group1';
    chkbox2.group='group1';
    chkbox3.group='group1';
    chkbox1.onChange.add(function(check){
      console.log(check);
    });
    chkbox3.disable();

    var btnMainState=game.gui.add.button(0,0,'main menu');
    btnMainState.onClick.add(function(){
      game.state.start('main');
    });
  }
}
