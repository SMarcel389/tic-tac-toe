// objects:
// Gameboard object getBoard, placeMarker, resetBoard, checkGameOver
// Player constructor
// GameLogic playTurn: placeMarker switch active player
// helper function to draw the board in console
// display

const display = (function () {
  const board = document.querySelector(".board");
  const activePlayer = document.querySelector(".currentPlayer");
  let gamestatus = "notover";

  const createGame = () => {
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
  return { createGame };
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
        return board[a]; // returns winning marker ("X" or "O")
      }
    }
    if (board.every((cell) => cell !== " ")) return "draw";
    return "notover";
  };

  return {
    getBoard,
    resetBoard,
    placeMarker,
    checkGameOver,
  };
})();

function Player(name, marker) {
  this.name = name;
  this.marker = marker;
}

Player.prototype.place = function (position) {
  Gameboard.placeMarker(position, this.marker);
};

let Player1 = new Player("Marci", "X");
let Player2 = new Player("Peti", "O");

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

display.createGame();

//playGame()
