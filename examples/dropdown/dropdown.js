example_dropdown={
  preload:function() {
  },
  create:function() {
    var dropdown=game.gui.add.dropdown(20,80,"default");
    dropdown.appendValue('option1');
    dropdown.appendValue('option2');
    dropdown.appendValue('option3');

    dropdown.onSelect.add(function(value){
      console.log(value);
    });

    var btnMainState=game.gui.add.button(0,0,'main menu');
    btnMainState.onClick.add(function(){
      game.state.start('main');
    });
  }
}
