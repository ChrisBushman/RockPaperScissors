const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);
const port = 8081;
const path = require('path');


global.appRoot = path.resolve(__dirname);

// Incremented to generate player IDs
server.lastPlayerID = 0;

// Incremented to generate match IDs
server.lastMatchID = 0;

// Stores players who have not been matched up with another to play a game
server.seekingPlayers = [];

// An associative array storing matches via ID
server.matches = {};

// Configure Express
app.use(bodyParser.json());
app.use('/', express.static(appRoot + '/app/client'));
app.use('/assets', express.static(__dirname + '/app/assets'));

require(__dirname + '/app/routes/routes')(app);
server.listen(port, () => {
  console.log('We are live on ' + port)
});

io.on('connection', (socket) => {
    // Register players looking to join a game. If a pair of players is available, put them in a match
    socket.on('seekingGame', () => {
        if (socket.player === undefined) {
            socket.player = {
                id: server.lastPlayerID++,
                choice: "",
                opponent: ""
            };
        }
      
        // Reset the opponent of a player
        socket.player.opponent = "";

        // In case multiple players are added before a pairing check occurs, we look to seek if the player pool is empty
        if (server.seekingPlayers.length < 1) {
            server.seekingPlayers.push(socket);
        }

        else {
            // Register and create the match
            var matchID = server.lastMatchID++;
            server.matches[matchID] = {
                players: {}
            };
            var player2 = server.seekingPlayers.splice(0, 1)[0];
            server.matches[matchID].players[socket.player.id] = socket;
            server.matches[matchID].players[player2.player.id] = player2;

            server.matches[matchID].players[socket.player.id].player.opponent = player2.player.id;
            server.matches[matchID].players[player2.player.id].player.opponent = socket.player.id;

            socket.emit('startMatch', matchID);
            player2.emit('startMatch', matchID);
        }
    });
    // The server resolves the player's selection of Rock, Paper, or Scissors
    socket.on('choiceMade', (matchID, submittedChoice) => {
        server.matches[matchID].players[socket.player.id].player.choice = submittedChoice;
        var player2 = server.matches[matchID].players[socket.player.opponent];
        var opponentChoice = player2.player.choice;
        // Make sure the opponent has not made their choice yet
        if ( opponentChoice !== "" ) {
            server.matches[matchID].players[socket.player.id].player.choice = "";
            server.matches[matchID].players[socket.player.opponent].player.choice = "";
            
            var socketResult = '';
            var player2Result = '';

            if (opponentChoice === submittedChoice) {
                socketResult = 'tie';
                player2Result = 'tie';
            }

            else {
                switch( submittedChoice ) {
                    case 'Rock':
                        if( opponentChoice === 'Paper') {
                            socketResult = 'lose';
                            player2Result = 'win';
                        }
                        
                        else {
                            socketResult = 'win';
                            player2Result = 'lose';
                        }
                        break;
                    case 'Paper':
                        if( opponentChoice === 'Scissors') {
                            socketResult = 'lose';
                            player2Result = 'win';
                        }
                        
                        else {
                            socketResult = 'win';
                            player2Result = 'lose';
                        }
                        break;
                    case 'Scissors':
                        if( opponentChoice === 'Rock') {
                            socketResult = 'lose';
                            player2Result = 'win';
                        }
                        
                        else {
                            socketResult = 'win';
                            player2Result = 'lose';
                        }
                        break;
                    default:
                        socketResult = 'tie';
                        player2Result = 'tie';
                }
            }

            socket.emit('matchResult', socketResult);
            player2.emit('matchResult', player2Result);
        }
    });
    // Each player is told that the match has ended to reduce the chance of out-of-sync events being submitted
    socket.on('quit', (matchID) => {
        server.matches[matchID].players[socket.player.opponent].emit('matchEnd');
        socket.emit('matchEnd');
        delete server.matches[matchID];
    })
});