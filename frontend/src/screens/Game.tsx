import { useEffect, useState } from "react";
import Button from "../components/Button";
import ChessBoard from "../components/ChessBoard";
import useSocket from "../hooks/useSocket";
import { Chess } from "chess.js";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

const Game = () => {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [winner, setWinner] = useState(null);
  const [start, setStart] = useState(false)

  const handleClick = () => {
    socket?.send(
      JSON.stringify({
        type: INIT_GAME,
      })
    );
  };

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (data) => {
      const message = JSON.parse(data.data);

      if (message.type === INIT_GAME) {
        setBoard(chess.board());
        setStart(true)
      } else if (message.type === MOVE) {
        const move = message.payload;
        chess.move(move);
        setBoard(chess.board());
      } else if (message.type === GAME_OVER) {
        setWinner(message.payload.winner);
      }
    };
  }, [socket, chess]);

  return (
    <div className="flex justify-center px-4 sm:px-8">
      <div className="pt-8 max-w-screen-lg w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <div className="md:col-span-2 w-full p-4">
            <ChessBoard
              board={board}
              socket={socket}
              chess={chess}
              setBoard={setBoard}
            />
          </div>

          <div className="flex flex-col justify-center items-center space-y-4">
            {winner && (
              <div className="text-center">
                <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                  Game Over
                </h1>
                <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                  Winner: {winner}
                </h1>
              </div>
            )}

            {!start?<Button text={"Play"} onClick={handleClick} />:""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
