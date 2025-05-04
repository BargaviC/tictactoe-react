class PlayerController {
    init() {
        console.log("PlayerController initialized");
    }

    botPlayerMove(board: string[]): number {
        const validPositions = Array(9).fill(null).map((_, index) => index).filter(index => board[index] === null);
        const randomIndex = Math.floor(Math.random() * validPositions.length);
        return validPositions[randomIndex];
    }
}

export default PlayerController;