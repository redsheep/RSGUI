example_textinput={
  preload:function() {
  },
  create:function() {
    var textinput = game.gui.add.textinput(100,100,"text","text");
    var password = game.gui.add.textinput(100,150,"text","password");
    var textinput2 = game.gui.add.textinput(100,200,"text","text");

    textinput.onChange.add(function(value){
      console.log(value);
    });
    password.onChange.add(function(value){
      console.log(value);
    });
    textinput2.resize(100,50);

    var btnMainState=game.gui.add.button(0,0,'main menu');
    btnMainState.onClick.add(function(){
      game.state.start('main');
    });
  }
}
