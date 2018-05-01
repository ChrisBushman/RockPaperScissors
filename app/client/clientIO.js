// Our socket.io client object
var client = {};
// URL of socket is entered here. Kept blank in repo.
client.socket = io.connect();

// Client is looking for a game to join
client.seekingGame = () => {
    client.socket.emit('seekingGame');
};

// Client submits Rock, Paper, or Scissors as the submitted choice
client.choiceMade = (submittedChoice) => {
    game.state.start('WaitForResult');
    client.socket.emit('choiceMade', game.matchID, submittedChoice);
};

// The client quits the match
client.quit = () => {
    client.socket.emit('quit', game.matchID);
};

// A match has been setup by the server
client.socket.on('startMatch', (data) => {
    game.matchID = data;
    game.state.start("GameMatch");
});

// The server has determined the result of the match
client.socket.on('matchResult', (data) => {
    switch (data) {
        case 'win':
            game.state.start("WinMatch");
            break;
        case 'lose':
            game.state.start("LoseMatch");
            break;
        case 'tie':
            game.state.start("TieMatch");
            break;
        default:
            game.state.start("ErrorMatch");
    }
});

// The server has cleaned up the match information on its end.
client.socket.on('matchEnd', () => {
    game.state.start("EndMatch");
})