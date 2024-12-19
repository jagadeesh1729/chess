import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/Game";
import bb from "../assets/bb.png";
import bn from "../assets/bn.png";
import bq from "../assets/bq.png";
import bk from "../assets/bk.png";
import br from "../assets/br.png";
import bp from "../assets/bp.png";
import wb from "../assets/wb.png";
import wn from "../assets/wn.png";
import wq from "../assets/wq.png";
import wk from "../assets/wk.png";
import wr from "../assets/wr.png";
import wp from "../assets/wp.png";
interface ChessSquare {
  square: Square;
  type: PieceSymbol;
  color: Color;
}

interface ChessBoardProps {
  board: (ChessSquare | null)[][];
  socket:WebSocket;
  chess:any;
  setBoard:any;
}
const pieceImages: Record<Color, Record<PieceSymbol, string>> = {
  b: { p: bp, r: br, n: bn, b: bb, q: bq, k: bk },
  w: { p: wp, r: wr, n: wn, b: wb, q: wq, k: wk },
};

const ChessBoard = ({ board ,socket,chess,setBoard}: ChessBoardProps) => {

  const renderSquare = (square: ChessSquare | null) => {
    if (!square) return null;
    const pieceImage = pieceImages[square.color]?.[square.type];
    return pieceImage ? (
      <img className="w-12 h-12" src={pieceImage} alt={`${square.color}${square.type}`} />
    ) : (
      square.type.toUpperCase() + square.square
    );
  };
  const [from, setFrom] = useState<Square| null>(null);
  const [to, setTo] = useState<Square | null>(null);
  return (
    <div className="grid grid-rows-8">
      {board.map((row: (ChessSquare | null)[], i: number) => (
        <div key={i} className="flex">
          {row.map((square: ChessSquare | null, j: number) => (
           
            <div
              onClick={() => {
                 const squarese = String.fromCharCode(97 + (j%8)) + (8 - i) as Square;
                  if(!from){
                      setFrom(squarese)
                  }
                  else{
                      socket.send(JSON.stringify({
                          type:MOVE,
                          payload:{
                            move:{
                              from,
                              to:squarese
                            }
                          }
                      }))
                      chess.move(
                        {
                          from,
                          to:squarese
                      }
                      )
                      setBoard(chess.board())
                      setFrom(null)
                      setTo(null)
                  }
                }
              }
            
              
              key={j}
              className={`w-16 h-16  flex justify-center items-center ${
                (i + j) % 2 === 0 ? "bg-green-500" : "bg-white"
              } f`}
            >
             {renderSquare(square)}

            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ChessBoard;
