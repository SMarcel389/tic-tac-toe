// objects:
// Gameboard object getBoard, placeMarker, resetBoard, checkGameOver
// Player constructor
// GameLogic playTurn: placeMarker switch active player
// helper function to draw the board in console
// display
const body = document.querySelector("body");

const display = (function () {
  const board = document.querySelector(".board");
  const activePlayer = document.querySelector(".message1");
  let gamestatus = "notover";

  const createGame = () => {
    playernames = document.querySelector(".playernames");
    body.removeChild(playernames);
    activePlayer.innerText = GameLogic.getCurrentPlayer().name + "'s turn";
    for (let i = 0; i < 9; i++) {
      const div = document.createElement("div");
      div.className = "div" + i;
      board.appendChild(div);

      div.addEventListener(
        "click",
        function () {
          div.innerText = GameLogic.getCurrentPlayer().marker;
          GameLogic.playTurn(i);

          const gamestatus = Gameboard.checkGameOver();
          if (gamestatus !== "notover") {
            activePlayer.innerText = gamestatus;
          } else {
            activePlayer.innerText =
              GameLogic.getCurrentPlayer().name + "'s turn";
          }
        },
        { once: true }
      );
    }
  };

  const setupGame = () => {
    activePlayer.innerHTML = "Name your players:";
    playButton = document.querySelector(".playbutton");

    playButton.addEventListener("click", function () {
      player1name = document.querySelector("#Player1input");
      player2name = document.querySelector("#Player2input");

      Player1.setname(player1name.value);
      Player2.setname(player2name.value);

      createGame();
    });
  };

  return { createGame, setupGame };
})();

const Gameboard = (function () {
  let board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
  const getBoard = () => board;
  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };
  const placeMarker = (position, marker) => {
    board[position] = marker;
  };

  const checkGameOver = () => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];
      if (board[a] !== " " && board[a] === board[b] && board[a] === board[c]) {
        return board[a] + " wins!"; // returns winning marker ("X" or "O")
      }
    }
    if (board.every((cell) => cell !== " ")) return "It's a draw!";
    return "notover";
  };

  return {
    getBoard,
    resetBoard,
    placeMarker,
    checkGameOver,
  };
})();

function Player(marker) {
  this.name = "name";
  this.marker = marker;
}

Player.prototype.place = function (position) {
  Gameboard.placeMarker(position, this.marker);
};

Player.prototype.setname = function (name) {
  this.name = name;
};

let Player1 = new Player("X");
let Player2 = new Player("O");

const GameLogic = (function () {
  let currentPlayer = Player1;
  const getCurrentPlayer = () => currentPlayer;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === Player1 ? Player2 : Player1;
  };
  const playTurn = (position) => {
    currentPlayer.place(position);
    switchPlayer();
  };

  return { getCurrentPlayer, switchPlayer, playTurn };
})();

function drawBoard() {
  b = Gameboard.getBoard();
  console.log(b[0] + "|" + b[1] + "|" + b[2]);
  console.log(b[3] + "|" + b[4] + "|" + b[5]);
  console.log(b[6] + "|" + b[7] + "|" + b[8]);
}

function playGame() {
  let gamestatus = "notover";
  while (gamestatus === "notover") {
    const input = parseInt(prompt("Place your marker:"));
    console.clear();
    GameLogic.playTurn(input);
    drawBoard();
    gamestatus = Gameboard.checkGameOver();
  }
  console.log("Winner:" + gamestatus);
}

display.setupGame();

//playGame()
