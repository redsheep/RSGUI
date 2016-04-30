example_button={
  preload:function() {
  },
  create:function() {
    var button = game.gui.add.button(50,55,"callback");
    button.onClick.add(function(pointer){
      console.log('click',pointer.x,pointer.y);
    });

    var btnSize = game.gui.add.button(50,100,"custom size");
    btnSize.resize(250,45);

    var btnRed = game.gui.add.button(50,155,"Failure");
    btnRed.setBGColor('#f00');
    var btnGreen = game.gui.add.button(140,155,"Success");
    btnGreen.setBGColor('#0f0');
    var btnOrange = game.gui.add.button(250,155,"Warning");
    btnOrange.setBGColor('#f90');

    var btnFont = game.gui.add.button(50,200,"custom Font");
    btnFont.setFont('My Font');

    var btnDisable = game.gui.add.button(50,250,"Disable");
    btnDisable.disable();

    var btnMainState=game.gui.add.button(0,0,'main menu');
    btnMainState.onClick.add(function(){
      game.state.start('main');
    });
  }
}
