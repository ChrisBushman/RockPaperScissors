# ROCK! PAPER! SCISSORS!

ROCK! PAPER! SCISSORS! is a JavaScript game based on the classic children's game. Players can access the game through their browser and opponents from all over the world!

## Getting Started

To start a server, clone the repository onto the box of your choice.

### Prerequisites

Node and Git will need to be installed on the server.


### Installing

Firstly, clone the repository

```
git clone git@github.com:ChrisBushman/RockPaperScissors.git
```

Secondly, install the node dependencies

```
npm install
```
Next, configure your client socket to connect to the server (app/client/clienIO.js: Line 4).

```
client.socket = io.connect("<Your Server Hostname>:8081");
```
Finally, run the development task to start the server.

```
npm run dev
```
And that's it! Now any modern browser can join in a game of ROCK! PAPER! SCISSORS!

## Built With

* [Phaser](https://phaser.io/docs/2.6.2/index) - HTML 5 Game Library used for the client
* [NodeJS](https://nodejs.org/en/docs/) - JavaScript Server Runtime
* [Socket.io](https://socket.io/docs/) - Socket library used for Server/Client event handling

## Authors

* **Chris Bushman** - *Initial work* - [ChrisBushman](https://github.com/ChrisBushman)

