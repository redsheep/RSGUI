# **RSGUI!**
GUI library for your Phaser games.
> **Features**

 - Built-in GUI components
 - Theme support
 - Easy to use

-------------------
> **Usage**

    var game = new Phaser.Game(480, 320, Phaser.CANVAS,
    '', {preload:preload,create:create});
    game.gui = new RSCanvasGUI(game);
    function preload() {
      //load custom theme if required
      game.gui.loadTheme('theme.json');
    }
    function create() {
      //add a gui component -- button
      button1 = game.gui.add.button(0,0,"button");
    }

> **For More Example visit [https://redsheep.github.io/RSGUI-Examples/](https://redsheep.github.io/RSGUI-Examples/)**
