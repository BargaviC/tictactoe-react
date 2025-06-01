import GameController from "./GameController";

class PlayerController {
    player: string;
    gameController: GameController; // Assuming GameController is defined elsewhere
    constructor(player: string, gameController?: GameController) {
        this.player = player;
        this.gameController = gameController || new GameController();
        console.log("PlayerController initialized with player:", player);
    }

    validPositions(board: string[]): number[] {
        return Array(9).fill(null).map((_, index) => index).filter(index => board[index] === null);
    }

    terminalTest(board: string[], availablePositions: number[]): number|undefined {
        const opponent = this.player === 'X' ? 'O' : 'X';
        if (this.gameController.winCondition(board, this.player)) {
            return 1; // Player wins
        } else if (this.gameController.winCondition(board, opponent)) {
            return -1; // Opponent wins
        } else if (availablePositions.length === 0) {
            return 0; // Draw
        }
        return undefined; // Game continues
    }

    minimalValue(board: string[], player: string): number {
        const opponent = player === 'X' ? 'O' : 'X';
        const availablePositions = this.validPositions(board);
        const terminated = this.terminalTest(board, availablePositions);
        if (terminated !== undefined) {
            return terminated; // Return the terminal value
        }
        let minValue = Infinity;
        for (const position of availablePositions) {
            const newBoard = [...board];
            newBoard[position] = player; // Place player's mark
            const value = this.maximalValue(newBoard, opponent);
            minValue = Math.min(minValue, value);
        }
        return minValue;
    }
    maximalValue(board: string[], player: string): number {
        const opponent = player === 'X' ? 'O' : 'X';
        const availablePositions = this.validPositions(board);
        const terminated = this.terminalTest(board, availablePositions);
        if (terminated !== undefined) {
            return terminated; // Return the terminal value
        }
        let maxValue = -Infinity;
        for (const position of availablePositions) {
            const newBoard = [...board];
            newBoard[position] = player; // Place player's mark
            const value = this.minimalValue(newBoard, opponent);
            maxValue = Math.max(maxValue, value);
        }
        return maxValue;
    }

    minimax(board: string[], player: string = 'X'): number {
        const availablePositions = this.validPositions(board);
        const values: {[position: number]: number} = {};
        for (const position of availablePositions) {
            const newBoard = [...board];
            newBoard[position] = player; // Place player's mark
            values[position] = this.minimalValue(newBoard, player === 'X' ? 'O' : 'X'); // Calculate value for this position
        }
        let bestValue = -Infinity;
        let bestPosition = -1;
        for (const position of availablePositions) {
            if (values[position] > bestValue) {
                bestValue = values[position];
                bestPosition = position;
            }
        }
        console.log("Best position for player", player, "is", bestPosition, "with value", bestValue);
        console.log("Values for positions:", values);
        return bestPosition;
    }

    botPlayerMove(board: string[]): number {
        // const validPositions = this.validPositions(board);
        // const randomIndex = Math.floor(Math.random() * validPositions.length);
        // return validPositions[randomIndex];

        return this.minimax(board, this.player);
    }
}

export default PlayerController;