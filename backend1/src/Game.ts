import { Chess } from "chess.js";
import WebSocket from "ws";
import { GAME_OVER, INIT_GAME, MOVE } from "./messeges";

export class Game {
  public player1: WebSocket;
  public player2: WebSocket;
  public board: Chess;
  public startTime: Date;
  public moveCount = 0;

  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.startTime = new Date();
    this.board = new Chess();

    this.player1.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: { color: "white" },
      })
    );

    this.player2.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: { color: "black" },
      })
    );
  }

  makeMove(socket: WebSocket, move: { from: string; to: string }) {
    const currentPlayer = this.moveCount % 2 === 0 ? this.player1 : this.player2;
    
    // Ensure correct player is making the move
    if (socket !== currentPlayer) {
      console.log("Move rejected: wrong player");
      return;
    }

    // Validate and make the move
    const result = this.board.move(move);
    if (!result) {
      console.log("Invalid move:", move);
      return;
    }

    // Increment move count after a valid move
    this.moveCount++;
    const opponent = socket === this.player1 ? this.player2 : this.player1;
    opponent.send(
      JSON.stringify({
        type: MOVE,
        payload: move,
      })
    );

    // Check for game over
    if (this.board.isGameOver()) {
      const winner = this.board.turn() === "w" ? "black" : "white";
      const gameOverMessage = JSON.stringify({
        type: GAME_OVER,
        payload: { winner },
      });

      this.player1.send(gameOverMessage);
      this.player2.send(gameOverMessage);

      console.log("Game over, winner:", winner);
      return;
    }

    // Broadcast the move to the opponent
    
  }
}
