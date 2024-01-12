// Game state
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

// DOM elements
const boardContainer = document.getElementById('board');
const messageElement = document.getElementById('message');

// Create game board
function createBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    boardContainer.appendChild(cell);
  }
}

// Handle cell click
function handleCellClick(event) {
  const clickedCell = event.target;
  const cellIndex = clickedCell.dataset.index;

  if (board[cellIndex] === '' && gameActive) {
    board[cellIndex] = currentPlayer;
    updateBoard();
    checkWin();
    checkDraw();
    togglePlayer();
  }
}

// Update the board display
function updateBoard() {
  board.forEach((value, index) => {
    const cell = boardContainer.children[index];
    cell.textContent = value;
  });
}

// Check for a winner
function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      endGame(`${currentPlayer} wins!`);
      return;
    }
  }
}

// Check for a draw
function checkDraw() {
  if (!board.includes('')) {
    endGame('It\'s a draw!');
  }
}

// Switch to the next player
function togglePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateMessage();
}

// Update the message element
function updateMessage() {
  messageElement.textContent = `Player ${currentPlayer}'s turn`;
}

// End the game
function endGame(message) {
  messageElement.textContent = message;
  gameActive = false;
}

// Reset the game
function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  updateBoard();
  updateMessage();
}

// Initialize the game
createBoard();
updateMessage();