// State: The player has submitted their choice of Rock, Paper, or Scissors.
//        Now the player waits for the server's result
var wait_for_result = function(game) {};

var waitForResultText;

wait_for_result.prototype = {
    create: () => {
        waitForResultText = game.add.text(game.world.centerX, game.world.height * 0.5, "And the result is...", instructionsStyle);
        waitForResultText.anchor.set(0.5, 0.5); 
    }
};