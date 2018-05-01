// State: The main title/menu of the game
var title = function(game) {};

var titleText, joinGameButton;

title.prototype = {
    preload: () => {
        game.load.image('joinGame', 'assets/JoinGameButton.png');
    },

    create: () => {
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
    }
};