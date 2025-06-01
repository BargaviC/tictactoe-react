import { ReactNode } from "react";
import Square from "./Square";
import React from "react";
import './board.css';
import GameController from "../controller/GameController";
import PlayerController from "../controller/PlayerController";


type BoardState = {
  xIsCurrent: boolean; // Indicates if it's X's turn
  squares: string[]; // Array to hold the values of the squares
  gameOver: boolean; // Indicates if the game is over
  gameDraw: boolean; // Indicates if the game is a draw
};

type BoardProps = {
};

class Board extends React.Component<BoardProps, BoardState> {
    positions: string[][] = [['top-left', 
        'top-center', 
        'top-right'],
      ['middle-left',
        'middle-center',
        'middle-right'],
      ['bottom-left',
        'bottom-center',
        'bottom-right']];
    controller: GameController;
    playerController: PlayerController
    botPlayer: string;

  constructor(props: any) {
    super(props);
    this.controller = new GameController();
    this.botPlayer = Math.random() < 0.5 ? 'X' : 'O'; // Randomly assign bot player
    this.playerController = new PlayerController(this.botPlayer);
    this.state = {
      xIsCurrent: this.botPlayer !== 'X', // Set the initial player based on botPlayer
      squares: Array(9).fill(null), // Initialize squares with null values
      gameOver: false, // Initialize game over state
      gameDraw: false, // Initialize game draw state
    } as BoardState;
  }

  setSquareValue = (position: number) => {
    const squares = this.state.squares.slice();
    squares[position] = this.state.xIsCurrent ? 'X' : 'O';
    this.setState((prevState) => ({
        xIsCurrent: !prevState.xIsCurrent,
        squares: squares,
    }));
  }

  resetBoard = () => {
    this.botPlayer = Math.random() < 0.5 ? 'X' : 'O'; // Randomly assign bot player
    this.setState({
      xIsCurrent: this.botPlayer !== 'X', // Reset the initial player based on botPlayer
      squares: Array(9).fill(null), // Reset squares to null values
      gameOver: false, // Reset game over state
      gameDraw: false, // Reset game draw state
    });
  }

  isBotMove() {
    return (this.state.xIsCurrent && this.botPlayer === 'X') || (!this.state.xIsCurrent && this.botPlayer === 'O');
  }

  componentDidUpdate() {
    if (this.controller.winCondition(this.state.squares) && !this.state.gameOver) {
      this.setState({
        gameOver: true,
      });
    } else if (this.controller.drawCondition(this.state.squares) && !this.state.gameOver) {
      this.setState({
        gameOver: true,
        gameDraw: true,
      });
    } else if (this.isBotMove() && !this.state.gameOver) {
      const botMove = this.playerController.botPlayerMove(this.state.squares);
      this.setSquareValue(botMove);
    }
  }

  render(): ReactNode {
    return (
      <div>
        <p> Current Player: {this.state.xIsCurrent ? 'X' : 'O'} </p>
        <p> Bot Player: {this.botPlayer} </p>
        {this.state.gameOver && (
          <div>
            <button onClick={this.resetBoard}>Reset</button>
            <p>Game Over!</p>
            <p>{(this.state.gameDraw ? 'It\'s a draw!' : ((this.state.xIsCurrent ? 'O' : 'X') + ' wins!'))}</p>
          </div>
        )}
        
        <div className="board">
        {this.positions.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((position, positionIndex) => (
                <Square
                  key={position}
                  value={this.state.squares[rowIndex * 3 + positionIndex]}
                  onClick={this.setSquareValue}
                  squareId={rowIndex * 3 + positionIndex}
                  className={position}
                />
              ))}
            </div>
            ))}
          </div>
      </div>
    );
  }
}

export default Board;