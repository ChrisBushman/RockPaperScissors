// State: The player has told the server he/she wants to play in a match. The player now waits
//        for an opponent.
var seek_game = function(game) {};

var waitText;

seek_game.prototype = {
    preload: () => {
        client.seekingGame();
    },
    create: () => {
        waitText = game.add.text(game.world.centerX, game.world.height * 0.5, "Waiting for another player...", instructionsStyle);
        waitText.anchor.set(0.5, 0.5);
    }
};