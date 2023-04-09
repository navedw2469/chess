import React, { useState } from "react";
import Piece from "./Piece";
import styles from './styles.module.css'
import {InitialPositionPieceMapping, InitialPiecePositionMapping} from "./constants";

export default function App() {
  const [positionPieceMapping, setPositionPieceMapping] = useState({ ...InitialPositionPieceMapping });
  const [piecePositionMapping, setPiecePositionMapping] = useState({ ...InitialPiecePositionMapping });
  const [movablePositions, setMovablePositions] = useState([]);
  const [currentMovablePiece, setCurrentMovablePiece] = useState("nothing");
  const [enPassantablePawn, setEnPassantablePawn] = useState("nothing");
  return (
    <div className={styles.App}>
      <div className={styles.box}>
        {["a", "b", "c", "d", "e", "f", "g", "h"].map((row) => {
          return (
            <div className={styles.widthDivider} key={row}>
              {[8, 7, 6, 5, 4, 3, 2, 1].map((column) => {
                return (
                  <div
                    className={styles.columnDivider}
                    id={styles[`${row}${column}`]}
                    // onClick={changeColor}
                    key={column}
                  >
                    <Piece
                      position={`${row}${column}`}
                      positionPieceMapping={positionPieceMapping}
                      setPositionPieceMapping={setPositionPieceMapping}
                      piecePositionMapping={piecePositionMapping}
                      setPiecePositionMapping={setPiecePositionMapping}
                      currentMovablePiece={currentMovablePiece}
                      setCurrentMovablePiece={setCurrentMovablePiece}
                      movablePositions={movablePositions}
                      setMovablePositions={setMovablePositions}
                      enPassantablePawn={enPassantablePawn}
                      setEnPassantablePawn={setEnPassantablePawn}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}