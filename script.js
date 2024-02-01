document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const resetBtn = document.getElementById('resetBtn');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }

        return null;
    }

    function checkTie() {
        return !gameBoard.includes(''); // The board is full, and there is no winner
    }

    function handleClick(index) {
        if (!gameActive || gameBoard[index] !== '') {
            return; // Cell is already occupied or game is not active
        }

        gameBoard[index] = currentPlayer;
        cells[index].innerText = currentPlayer;

        const winner = checkWinner();
        if (winner) {
            status.innerText = `${winner} wins!`;
            gameActive = false;
        } else if (checkTie()) {
            status.innerText = 'It\'s a tie!';
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.innerText = `${currentPlayer}'s turn`;
        }
    }

    function handleCellClick(event) {
        const index = event.target.dataset.index;
        handleClick(index);
    }

    function handleResetClick() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        status.innerText = `${currentPlayer}'s turn`;

        cells.forEach(cell => {
            cell.innerText = '';
        });
    }

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    resetBtn.addEventListener('click', handleResetClick);
});
