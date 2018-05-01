var wait_for_result = function(game) {
  
};

var waitForResultText;

wait_for_result.prototype = {
    preload: function() {
    },

    create: function() {
        waitForResultText = game.add.text(game.world.centerX, game.world.height * 0.5, "And the result is...", instructionsStyle);
        waitForResultText.anchor.set(0.5, 0.5); 
    }
};