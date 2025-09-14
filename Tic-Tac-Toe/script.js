const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

let board = Array(9).fill(null);
let currentPlayer = "X";
let gameOver = false;

// Winning combinations
const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]           // diagonals
];

// Create 9 cells
function createBoard() {
  boardEl.innerHTML = "";
  board.forEach((_, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => makeMove(index, cell));
    boardEl.appendChild(cell);
  });
}

function makeMove(index, cell) {
  if (board[index] || gameOver) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("taken");

  if (checkWinner()) {
    statusEl.textContent = `🎉 Player ${currentPlayer} Wins!`;
    gameOver = true;
  } else if (board.every(cell => cell)) {
    statusEl.textContent = "It's a Draw!";
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusEl.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

function checkWinner() {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

resetBtn.addEventListener("click", resetGame);

function resetGame() {
  board = Array(9).fill(null);
  currentPlayer = "X";
  gameOver = false;
  statusEl.textContent = `Player X's Turn`;
  createBoard();
}

// Initialize game
createBoard();
