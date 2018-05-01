// State: The player is in an arranged match with another player. 
var game_match = function(game) {};

var selectionText, rockButton, paperButton, scissorsButton;

game_match.prototype = {
    preload: () => {
        game.load.image('Rock', 'assets/RockButton.png');
        game.load.image('Paper', 'assets/PaperButton.png');
        game.load.image('Scissors', 'assets/ScissorsButton.png');
    },
    create: () => {
        selectionText = game.add.text(game.world.centerX, game.world.height * 0.2, "Select Your Weapon!", instructionsStyle);
        selectionText.anchor.set(0.5, 0.5);

        rockButton = game.add.button(game.world.centerX, 
                                     game.world.height * 0.4, 
                                     'Rock',
                                     () => {
                                        rockButton.tint = 0.1 * 0xffffff;
                                        client.choiceMade('Rock');
                                     }, this);
        rockButton.tint = 0.5 * 0xffffff;
        rockButton.anchor.set(0.5, 0.5);

        rockButton.onInputOver.add(() => {
            rockButton.tint = 0.8 * 0xffffff;
        }, this);

        rockButton.onInputOut.add(() => {
            rockButton.tint = 0.5 * 0xffffff;
        }, this);

        paperButton = game.add.button(game.world.centerX, 
                                     game.world.height * 0.6, 
                                     'Paper',
                                     () => {
                                        paperButton.tint = 0.1 * 0xffffff;
                                        client.choiceMade('Paper');
                                     }, this);
        paperButton.tint = 0.5 * 0xffffff;
        paperButton.anchor.set(0.5, 0.5);

        paperButton.onInputOver.add(() => {
            paperButton.tint = 0.8 * 0xffffff;
        }, this);

        paperButton.onInputOut.add(() => {
            paperButton.tint = 0.5 * 0xffffff;
        }, this);

        scissorsButton = game.add.button(game.world.centerX, 
                                         game.world.height * 0.8, 
                                         'Scissors',
                                         () => {
                                             scissorsButton.tint = 0.1 * 0xffffff;
                                             client.choiceMade('Scissors');
                                         }, this);
        scissorsButton.tint = 0.5 * 0xffffff;
        scissorsButton.anchor.set(0.5, 0.5);

        scissorsButton.onInputOver.add(() => {
            scissorsButton.tint = 0.8 * 0xffffff;
        }, this);

        scissorsButton.onInputOut.add(() => {
            scissorsButton.tint = 0.5 * 0xffffff;
        }, this);
    }
};