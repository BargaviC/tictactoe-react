class GameController {
    winningCombinations: number[][] = [
        [0, 1, 2], // Row 1
        [3, 4, 5], // Row 2
        [6, 7, 8], // Row 3
        [0, 3, 6], // Column 1
        [1, 4, 7], // Column 2
        [2, 5, 8], // Column 3
        [0, 4, 8], // Diagonal 1
        [2, 4, 6], // Diagonal 2
    ];
    init() {
        console.log("GameController initialized");
    }

    terminationCondition(board: string[], player: string|null = null): boolean {
        return this.winCondition(board, player) || this.drawCondition(board);
    }

    winCondition(board: string[], player: string|null = null): boolean {
        // Check for winning combinations
        for (const combination of this.winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c] && (player === null || board[a] === player)) {
                return true;
            }
        }
        return false;
    }
    // Check if the game is a draw
    drawCondition(board: string[]): boolean {
        // Check if all squares are filled
        return board.every(square => square !== null);
    }
}

export default GameController;