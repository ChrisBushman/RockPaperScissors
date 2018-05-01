const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);
const port = 8081;
const path = require('path');


global.appRoot = path.resolve(__dirname);
server.lastPlayerID = 0;
server.lastMatchID = 0;
server.seekingPlayers = [];
server.matches = {};

// Configure Express
app.use(bodyParser.json());
app.use('/css', express.static(__dirname + '/app/css'));
app.use('/', express.static(appRoot + '/app/client'));
app.use('/libraries', express.static(__dirname + '/app/libraries'));
app.use('/assets', express.static(__dirname + '/app/assets'));

require(__dirname + '/app/routes/routes')(app);
server.listen(port, () => {
  console.log('We are live on ' + port)
});

io.on('connection', (socket) => {
    socket.on('seekingGame', () => {
        if (socket.player === undefined) {
            socket.player = {
                id: server.lastPlayerID++,
                choice: "",
                opponent: ""
            };
        }
      
        socket.player.opponent = "";

        if (server.seekingPlayers.length < 1) {
            server.seekingPlayers.push(socket);
        }

        else {
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

    socket.on('choiceMade', (matchID, submittedChoice) => {
        server.matches[matchID].players[socket.player.id].player.choice = submittedChoice;
        var player2 = server.matches[matchID].players[socket.player.opponent];
        var opponentChoice = player2.player.choice;

        if ( player2.player.choice !== "" ) {
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

    socket.on('quit', (matchID) => {
        server.matches[matchID].players[socket.player.opponent].emit('matchEnd');
        socket.emit('matchEnd');
        delete server.matches[matchID];
    })
});