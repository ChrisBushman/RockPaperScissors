// State: The result of the match was a tie!
var tie_match = function(game) {};

var tieResultText, playAgainButton, quitButton;

tie_match.prototype = {
    preload: () => {
        game.load.image('playAgain', 'assets/PlayAgainButton.png');
        game.load.image('quit', 'assets/QuitButton.png');
    },

    create: () => {
        tieResultText = game.add.text(game.world.centerX, game.world.height * 0.2, "You Tied!", instructionsStyle);
        tieResultText.anchor.set(0.5, 0.5);

        playAgainButton = game.add.button(game.world.centerX, 
                                          game.world.height * 0.4, 
                                          'playAgain',
                                          () => {
                                             playAgainButton.tint = 0.1 * 0xffffff;
                                             game.state.start("GameMatch");
                                          }, this);
        playAgainButton.tint = 0.5 * 0xffffff;
        playAgainButton.anchor.set(0.5, 0.5);

        playAgainButton.onInputOver.add(() => {
            playAgainButton.tint = 0.8 * 0xffffff;
        }, this);

        playAgainButton.onInputOut.add(() => {
            playAgainButton.tint = 0.5 * 0xffffff;
        }, this);

        quitButton = game.add.button(game.world.centerX, 
                                     game.world.height * 0.6, 
                                     'quit',
                                     () => {
                                        quitButton.tint = 0.1 * 0xffffff;
                                        client.quit();
                                     }, this);
        quitButton.tint = 0.5 * 0xffffff;
        quitButton.anchor.set(0.5, 0.5);

        quitButton.onInputOver.add(() => {
            quitButton.tint = 0.8 * 0xffffff;
        }, this);

        quitButton.onInputOut.add(() => {
            quitButton.tint = 0.5 * 0xffffff;
        }, this);
    }
};