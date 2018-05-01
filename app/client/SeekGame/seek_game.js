var seek_game = function(game) {
  
};

var waitText;

seek_game.prototype = {
    preload: function() {
        client.seekingGame();
    },
    create: function() {
        waitText = game.add.text(game.world.centerX, game.world.height * 0.5, "Waiting for another player...", instructionsStyle);
        waitText.anchor.set(0.5, 0.5);
    }
};