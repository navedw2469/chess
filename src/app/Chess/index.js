import React, { useState } from "react";
import Square from "./Square";
import styles from "./styles.module.css";
import { PieceEncoding } from "./constants";
import { Notations } from "./fenNotations";
import { findAllLegalMoves } from "./utility/findLegalMoves";
import { getPositionToPieceMapping } from "./utility/getPositionFromFen";

function handleClick(
  squareNumber,
  clickedSquare,
  setClickedSquare,
  movablePositions,
  setMovablePositions,
  currentColor,
  setCurrentColor,
  positionToPieceMapping,
  setPositionToPieceMapping,
  enPassantPawnPos,
  setEnPassantPawnPos,
  promotionType = null,
  casteling,
  setCasteling
) {
  // if no squares are clicked
  if (clickedSquare == -1 && !movablePositions[squareNumber]) return;

  if (clickedSquare == -1) {
    setClickedSquare(squareNumber);
    return;
  }

  // if any sqaure is clicked
  // if i press same square square should be deselected
  // if i press any other square other than movable squares, square should be deselected

  if (
    squareNumber == clickedSquare ||
    !movablePositions[clickedSquare].includes(squareNumber)
  ) {
    setClickedSquare(-1);
    return;
  }

  // if i press movable square
  // 1. it is enemy square so capture it (done)
  // 1. it is enemy square so capture it but prmotion (done)
  // 2. it is blank square just go there (done)
  // 3. it is blank square (but castling is possible)
  // 4. it is blank square (but en passant is possible, so take care of enemy pawn) (done)
  // 5. it is blank square but promotion (done)

  let pieceType = positionToPieceMapping[clickedSquare] & 7;
  let newPositionToPieceMapping = {
    ...positionToPieceMapping,
    [squareNumber]: positionToPieceMapping[clickedSquare],
    [clickedSquare]: undefined,
  };

  let newEnPassantPawnPos = -1;
  if (
    pieceType == PieceEncoding.pawn &&
    Math.abs(clickedSquare - squareNumber) == 16
  ) {
    newEnPassantPawnPos = squareNumber;
  }

  if (
    pieceType == PieceEncoding.pawn &&
    enPassantPawnPos != -1 &&
    Math.abs(squareNumber - enPassantPawnPos) == 8 &&
    Math.abs(squareNumber - clickedSquare) % 8 != 0
  ) {
    newPositionToPieceMapping[enPassantPawnPos] = undefined;
  }

  if (
    pieceType == PieceEncoding.pawn &&
    [0, 7].includes(Math.floor(squareNumber / 8))
  ) {
    newPositionToPieceMapping[squareNumber] = promotionType | currentColor;
  }

  if (pieceType == PieceEncoding.king) {
    if (
      clickedSquare - squareNumber == 2 &&
      currentColor == PieceEncoding.black
    ) {
      newPositionToPieceMapping[0] = undefined;
      newPositionToPieceMapping[3] = PieceEncoding.black | PieceEncoding.rook;
    }

    if (
      squareNumber - clickedSquare == 2 &&
      currentColor == PieceEncoding.black
    ) {
      newPositionToPieceMapping[7] = undefined;
      newPositionToPieceMapping[5] = PieceEncoding.black | PieceEncoding.rook;
    }

    if (
      clickedSquare - squareNumber == 2 &&
      currentColor == PieceEncoding.white
    ) {
      newPositionToPieceMapping[56] = undefined;
      newPositionToPieceMapping[59] = PieceEncoding.white | PieceEncoding.rook;
    }

    if (
      squareNumber - clickedSquare == 2 &&
      currentColor == PieceEncoding.white
    ) {
      newPositionToPieceMapping[63] = undefined;
      newPositionToPieceMapping[61] = PieceEncoding.white | PieceEncoding.rook;
    }

    if (currentColor == PieceEncoding.black && (casteling.q || casteling.k)) {
      setCasteling((prev) => {
        return { ...prev, q: false, k: false };
      });
    }

    if (currentColor == PieceEncoding.white && (casteling.Q || casteling.K)) {
      setCasteling((prev) => {
        return { ...prev, Q: false, K: false };
      });
    }
  }

  if ((squareNumber == 0 || clickedSquare == 0) && casteling.q) {
    setCasteling((prev) => {
      return { ...prev, q: false };
    });
  }

  if ((squareNumber == 7 || clickedSquare == 7) && casteling.k) {
    setCasteling((prev) => {
      return { ...prev, k: false };
    });
  }

  if ((squareNumber == 56 || clickedSquare == 56) && casteling.Q) {
    setCasteling((prev) => {
      return { ...prev, Q: false };
    });
  }

  if ((squareNumber == 63 || clickedSquare == 63) && casteling.K) {
    setCasteling((prev) => {
      return { ...prev, K: false };
    });
  }

  setEnPassantPawnPos(newEnPassantPawnPos);

  setPositionToPieceMapping(newPositionToPieceMapping);

  setClickedSquare(-1);

  let opponentColor =
    currentColor == PieceEncoding.black
      ? PieceEncoding.white
      : PieceEncoding.black;

  let newLegalPos = findAllLegalMoves(
    newPositionToPieceMapping,
    opponentColor,
    newEnPassantPawnPos,
    casteling
  );

  setMovablePositions(newLegalPos);
  setCurrentColor(opponentColor);

  if (Object.keys(newLegalPos).length === 0) {
    setTimeout(() => {
      alert(`${currentColor == PieceEncoding.black ? "black" : "white"} won`);
    }, 500);
  }
}

export default function App() {
  const [positionToPieceMapping, setPositionToPieceMapping] = useState(
    getPositionToPieceMapping(Notations[0])
  );
  const [currentColor, setCurrentColor] = useState(PieceEncoding.white);
  const [casteling, setCasteling] = useState({
    k: true,
    q: true,
    K: true,
    Q: true,
  });
  const [enPassantPawnPos, setEnPassantPawnPos] = useState(-1);
  const [movablePositions, setMovablePositions] = useState(
    findAllLegalMoves(
      positionToPieceMapping,
      currentColor,
      enPassantPawnPos,
      casteling
    )
  );

  const [clickedSquare, setClickedSquare] = useState(-1);

  return (
    <div className={styles.App}>
      <div className={styles.box}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((row) => {
          return (
            <div className={styles.row} key={row}>
              {[0, 1, 2, 3, 4, 5, 6, 7].map((column) => {
                return (
                  <div
                    className={styles.cell}
                    id={(row + column) % 2 == 0 ? styles.white : styles.black}
                    onClick={() => {
                      let promotionType = null;
                      if (
                        (row == 0 || row == 7) &&
                        (positionToPieceMapping[clickedSquare] ^
                          currentColor) ==
                          PieceEncoding.pawn
                      ) {
                        promotionType = +prompt(
                          "choose the promotion type knight: 2, bishop: 3, rook: 4, queen: 5"
                        );

                        console.log(promotionType, "hi");
                      }
                      handleClick(
                        row * 8 + column,
                        clickedSquare,
                        setClickedSquare,
                        movablePositions,
                        setMovablePositions,
                        currentColor,
                        setCurrentColor,
                        positionToPieceMapping,
                        setPositionToPieceMapping,
                        enPassantPawnPos,
                        setEnPassantPawnPos,
                        promotionType,
                        casteling,
                        setCasteling
                      );
                    }}
                    key={column}
                  >
                    <Square
                      squareNumber={row * 8 + column}
                      positionToPieceMapping={positionToPieceMapping}
                      isTarget={(
                        movablePositions[clickedSquare] || []
                      ).includes(row * 8 + column)}
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
