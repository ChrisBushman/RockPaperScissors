// Initalize Game object
var game = new Phaser.Game(window.innerWidth,
                           window.innerHeight,
                           Phaser.CANVAS, 
                           "game");

// Game global objects
var instructionsStyle = { font: "30px Arial", fill: "#ff0044", align: "center" };
game.matchID = "";


// Mangage avaialble game states
game.state.add("Title", title);
game.state.add("SeekGame", seek_game);
game.state.add("GameMatch", game_match);
game.state.add("WaitForResult", wait_for_result);
game.state.add("WinMatch", win_match);
game.state.add("LoseMatch", lose_match);
game.state.add("TieMatch", tie_match);
game.state.add("ErrorMatch", error_match);
game.state.add("EndMatch", end_match);

game.state.start("Title");