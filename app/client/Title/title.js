var title = function(game) {
  
};

var titleText, joinGameButton;

title.prototype = {
    preload: function() {
        game.load.image('joinGame', 'assets/JoinGameButton.png');
    },

    create: function() {
        titleText = game.add.text(game.world.centerX, game.world.height * 0.2, "ROCK! PAPER! SCISSORS!", instructionsStyle);
        titleText.anchor.set(0.5, 0.5);

        joinGameButton = game.add.button(game.world.centerX, 
                                         game.world.height * 0.6, 
                                         'joinGame',
                                         () => {
                                            joinGameButton.tint = 0.1 * 0xffffff;
                                            game.state.start("SeekGame");
                                         }, this);
        joinGameButton.tint = 0.5 * 0xffffff;
        joinGameButton.anchor.set(0.5, 0.5);
        joinGameButton.onInputOver.add(() => {
            joinGameButton.tint = 0.8 * 0xffffff;
        }, this);
        joinGameButton.onInputOut.add(() => {
            joinGameButton.tint = 0.5 * 0xffffff;
        }, this);
    },
  
    update: function() {
        if (game.input.keyboard.isDown(Phaser.KeyCode.ENTER)) {
        }
    }
};