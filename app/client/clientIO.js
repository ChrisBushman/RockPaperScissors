var client = {
    // Have address set up for client to connect to
    socket: io.connect("http://ANET_CodeSample-christopherwbushman33830.codeanyapp.com:8081"),
    // Events
    seekingGame: () => {
        client.socket.emit('seekingGame');
    },

    choiceMade: (submittedChoice) => {
        game.state.start('WaitForResult');
        client.socket.emit('choiceMade', game.matchID, submittedChoice);
    },

    quit: () => {
        client.socket.emit('quit', game.matchID);
    }
};

client.socket.on('startMatch', (data) => {
    game.matchID = data;
    game.state.start("GameMatch");
});

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

client.socket.on('matchEnd', () => {
    game.state.start("EndMatch");
})