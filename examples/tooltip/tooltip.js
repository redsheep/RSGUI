example_tooltip={
  preload:function() {
  },
  create:function() {
    var downToolTip=game.gui.add.tooltip(200,50,'this is a tip\n with two lines',ToolTipDirect.Bottom);
    var upToolTip=game.gui.add.tooltip(200,250,'this is a tip\n with two lines',ToolTipDirect.Top);
    var leftToolTip=game.gui.add.tooltip(300,150,'this is a tip\n with two lines',ToolTipDirect.Left);
    var rightToolTip=game.gui.add.tooltip(100,150,'this is a tip\n with two lines',ToolTipDirect.Right);

    var btnMainState=game.gui.add.button(0,0,'main menu');
    btnMainState.onClick.add(function(){
      game.state.start('main');
    });
  }
}
