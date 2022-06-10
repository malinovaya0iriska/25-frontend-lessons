const BOARD_WIDTH = 3;

let boardState = generateEmptyBoardState();
let currentPlayer = 1;
let numMovesDone = 0;

const gameSquares = document.querySelectorAll('.game-cell');
const gameHeading = document.getElementById('game-heading');
const restartButton = document.getElementById('restart-button');

gameSquares.forEach((gameSquare, i) => {
  gameSquare.addEventListener('click', () => {
    const row = Math.floor(i / BOARD_WIDTH);
    const col = i % BOARD_WIDTH;
    makeMove(gameSquare, row, col);
  });
});

restartButton.addEventListener('click', restartGame);

function makeMove(gameSquare, row, col) {
  gameSquare.textContent = currentPlayer === 1 ? 'X' : 'O';
  gameSquare.disabled = true;
  numMovesDone++;
  boardState[row][col] = currentPlayer;

  if (didPlayerWin(currentPlayer)) {
    gameHeading.textContent = `Player ${currentPlayer} Won!`;
    endGame();
  } else if (numMovesDone >= BOARD_WIDTH * BOARD_WIDTH) {
    gameHeading.textContent = 'Tie Game';
    endGame();
  } else {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    setCurrentPlayerHeader();
  }
}

function setCurrentPlayerHeader() {
  gameHeading.textContent = `Player ${currentPlayer}'s Turn`;
}

function didPlayerWin(player) {
  const rows = [0, 1, 2];
  const cols = [0, 1, 2];

  const wonHorizontally = rows.some((row) => {
    return (
      boardState[row][0] === currentPlayer &&
      boardState[row][1] === currentPlayer &&
      boardState[row][2] === currentPlayer
    );
  });

  const wonVertically = cols.some((col) => {
    return (
      boardState[0][col] === currentPlayer &&
      boardState[1][col] === currentPlayer &&
      boardState[2][col] === currentPlayer
    );
  });

  const wonTopLeftToBottomRight =
    boardState[0][0] === currentPlayer &&
    boardState[1][1] === currentPlayer &&
    boardState[2][2] === currentPlayer;

  const wonTopRightToBottomLeft =
    boardState[2][0] === currentPlayer &&
    boardState[1][1] === currentPlayer &&
    boardState[0][2] === currentPlayer;

  return (
    wonHorizontally ||
    wonVertically ||
    wonTopLeftToBottomRight ||
    wonTopRightToBottomLeft
  );
}

function endGame() {
  restartButton.style.display = 'block';
  gameSquares.forEach((gameSquare) => (gameSquare.disabled = true));
}

function generateEmptyBoardState() {
  return new Array(BOARD_WIDTH).fill().map(() => new Array(BOARD_WIDTH).fill());
}

function restartGame() {
  boardState = generateEmptyBoardState();

  currentPlayer = 1;
  numMovesDone = 0;

  setCurrentPlayerHeader();

  gameSquares.forEach((gameSquare) => {
    gameSquare.textContent = '';
    gameSquare.disabled = false;
  });

  restartButton.style.display = 'none';
}
