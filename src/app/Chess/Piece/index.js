import React, { useState } from "react";
import Image from "next/image";
import blurrCircle from "./../Images/blurrCircle.png";
import {PieceImageMapping, King, Queen, Bishop, Rook, Knight, BlackPawn, WhitePawn, InitialPiecePositionMapping } from "./../constants"
import styles from './styles.module.css';

const nextChar = (c, incrementBy) => {
  if ((c === "a" && incrementBy < 0) || (c === "h" && incrementBy > 0))
    return false;
  return String.fromCharCode(c.charCodeAt(0) + incrementBy);
};

const Piece = ({
  position,
  positionPieceMapping,
  setPositionPieceMapping,
  piecePositionMapping,
  setPiecePositionMapping,
  currentMovablePiece,
  setCurrentMovablePiece,
  movablePositions,
  setMovablePositions,
  enPassantablePawn,
  setEnPassantablePawn,
}) => {

  const whereKingCanMove = (currentPosition) => {
    const row = currentPosition[1];
    const column = currentPosition[0];

    const kingMovablePositions = [];
    [-1, 0, 1].forEach((r) => {
      const tempRow = +row + r;
      if (tempRow < 1 || tempRow > 8) return;
      [-1, 0, 1].forEach((c) => {
        const tempCol = nextChar(column, c);
        if (!tempRow) return;
        const tempPosition = `${tempCol}${tempRow}`;

        if(!positionPieceMapping[tempPosition] || positionPieceMapping[tempPosition].slice(0,5) !== positionPieceMapping[currentPosition].slice(0,5))
        if (currentPosition !== tempPosition) {
          kingMovablePositions.push(tempPosition);
        }
      });
    });
    return kingMovablePositions;
  };

  const whereQueenCanMove = (currentPosition) =>{
    const row = currentPosition[1];
    const column = currentPosition[0];
    const queenMovablePositions = [];

    [-1, 0, 1].forEach((r) => {
      [-1, 0, 1].forEach((c) => {
        let isBlocked = false;
        [1, 2, 3, 4, 5, 6, 7, 8].forEach((m) =>{
          if(isBlocked) return;

          const tempRow = +row + r*m;
          if (tempRow < 1 || tempRow > 8) return;

          const tempCol = nextChar(column, c*m);
          if (!tempRow) return;

          const tempPosition = `${tempCol}${tempRow}`;

          isBlocked = positionPieceMapping[tempPosition];

          if (!isBlocked || positionPieceMapping[tempPosition].slice(0,5) !== positionPieceMapping[currentPosition].slice(0,5)) {
            queenMovablePositions.push(tempPosition);
          }
        });
      });
    });
    return queenMovablePositions;
  }

  const whereBishopCanMove = (currentPosition) =>{
    const row = currentPosition[1];
    const column = currentPosition[0];
    const bishopMovablePositions = [];

    [-1, 1].forEach((r) => {
      [-1, 1].forEach((c) => {
        let isBlocked = false;
        [1, 2, 3, 4, 5, 6, 7, 8].forEach((m) =>{
          if(isBlocked) return;

          const tempRow = +row + r*m;
          if (tempRow < 1 || tempRow > 8) return;

          const tempCol = nextChar(column, c*m);
          if (!tempRow) return;

          const tempPosition = `${tempCol}${tempRow}`;

          isBlocked = positionPieceMapping[tempPosition];


          if (!isBlocked || positionPieceMapping[tempPosition].slice(0,5) !== positionPieceMapping[currentPosition].slice(0,5)) {
            bishopMovablePositions.push(tempPosition);
          }
        });
      });
    });
    return bishopMovablePositions;
  }

  const whereRookCanMove = (currentPosition) =>{
    const row = currentPosition[1];
    const column = currentPosition[0];
    const rookMovablePositions = [];

    [-1, 0, 1].forEach((r) => {
      [-1, 0, 1].forEach((c) => {
        let isBlocked = false;
        [1, 2, 3, 4, 5, 6, 7, 8].forEach((m) =>{
          if(isBlocked) return;

          const tempRow = +row + r*m;
          if (tempRow < 1 || tempRow > 8) return;

          const tempCol = nextChar(column, c*m);
          if (!tempRow) return;

          const tempPosition = `${tempCol}${tempRow}`;

          isBlocked = positionPieceMapping[tempPosition];

          if ((!isBlocked || positionPieceMapping[tempPosition].slice(0,5) !== positionPieceMapping[currentPosition].slice(0,5)) && (tempCol == column || tempRow == row)) {
            rookMovablePositions.push(tempPosition);
          }
        });
      });
    });
    return rookMovablePositions;
  }

  const whereKnightCanMove = (currentPosition)=>{
    const row = currentPosition[1];
    const column = currentPosition[0];

    const knightMovablePositions = [];

    [{r: 1,c: 2}, {r:2, c: 1}].forEach((m)=>{
      [-1, 1].forEach((r) => {
        const tempRow = +row + r*m.r;
        if (tempRow < 1 || tempRow > 8) return;
        [-1, 1].forEach((c) => {
          const tempCol = nextChar(column, c*m.c);
          if (!tempRow) return;
          const tempPosition = `${tempCol}${tempRow}`;

          if(!positionPieceMapping[tempPosition] || positionPieceMapping[tempPosition].slice(0,5) !== positionPieceMapping[currentPosition].slice(0,5)){
            knightMovablePositions.push(tempPosition);
          }
        });
      });
    });
    return knightMovablePositions;
  };

  const whereWhitePawnCanMove = (currentPosition) =>{
    return wherePawnCanMove(currentPosition, 1);
  }

  const whereBlackPawnCanMove = (currentPosition) =>{
    return wherePawnCanMove(currentPosition, -1);
  }

  const wherePawnCanMove = (currentPosition, m) =>{
    const row = currentPosition[1];
    const column = currentPosition[0];

    const pawnMovablePositions = [];

    [1,2].forEach((r)=>{
      if(r === 2 && currentPosition !== InitialPiecePositionMapping[positionPieceMapping[currentPosition]]) return;

      const tempRow = +row + r*m;
      if (tempRow < 1 || tempRow > 8) return [];
  
      [-1,0,1].forEach((c)=>{
        const tempCol = nextChar(column, c);
        if (!tempRow) return;
  
        const tempPosition = `${tempCol}${tempRow}`;
        if(c === 0 && !positionPieceMapping[tempPosition]){
          pawnMovablePositions.push(tempPosition);
        }else if((c === 1 || c === -1) && r === 1 && 
        ((positionPieceMapping[tempPosition] && positionPieceMapping[tempPosition].slice(0,5) !== positionPieceMapping[currentPosition].slice(0,5)) || 
        positionPieceMapping[`${tempCol}${row}`] === enPassantablePawn)){
          pawnMovablePositions.push(tempPosition);
        }
      })
    })
    return pawnMovablePositions;
  }

  const showMovablePostions = (piece) => {
    setMovablePositions([]);
    if(currentMovablePiece === piece) {
      setCurrentMovablePiece("nothings");
      return;
    }

    if(King.includes(piece)) movablePositions = whereKingCanMove(piecePositionMapping[piece]);
    if(Queen.includes(piece)) movablePositions = whereQueenCanMove(piecePositionMapping[piece]);
    if(Bishop.includes(piece)) movablePositions = whereBishopCanMove(piecePositionMapping[piece]);
    if(Rook.includes(piece)) movablePositions = whereRookCanMove(piecePositionMapping[piece]);
    if(Knight.includes(piece)) movablePositions = whereKnightCanMove(piecePositionMapping[piece]);
    if(WhitePawn.includes(piece)) movablePositions = whereWhitePawnCanMove(piecePositionMapping[piece]);
    if(BlackPawn.includes(piece)) movablePositions = whereBlackPawnCanMove(piecePositionMapping[piece]);
    
    setMovablePositions(movablePositions);
    setCurrentMovablePiece(piece);

    setPositionPieceMapping({ ...positionPieceMapping });
  };

  const enPassantablity = (pos) =>{
    const row = pos[1];
    const col = pos[0];

    const currentRow = piecePositionMapping[currentMovablePiece][1];
    const currentCol = piecePositionMapping[currentMovablePiece][0];

    if(Math.abs(+currentRow - +row) === 2){
      setEnPassantablePawn(currentMovablePiece);
      return;
    }
    
    const remPawnAtPos = `${col}${currentRow}`;
    
    if(currentCol === col || enPassantablePawn !== positionPieceMapping[remPawnAtPos]){
      setEnPassantablePawn("nothing");
      return;
    }
    
    const remPawn = positionPieceMapping[remPawnAtPos];
    piecePositionMapping[remPawn] = null;
    positionPieceMapping[remPawnAtPos] = null;
    setEnPassantablePawn("nothing");
  }

  const movePosition = (pos) => {
    const currentPosition = piecePositionMapping[currentMovablePiece];
    if([...WhitePawn, ...BlackPawn].includes(positionPieceMapping[currentPosition])){
      enPassantablity(pos);
    }else{
      setEnPassantablePawn("nothing");
    }
    positionPieceMapping[currentPosition] = null;
    positionPieceMapping[pos] = currentMovablePiece;
    piecePositionMapping[currentMovablePiece] = pos;
    currentMovablePiece = "nothing";
    
    setMovablePositions([]);

    setPositionPieceMapping({...positionPieceMapping});
    setPiecePositionMapping({...piecePositionMapping});
    setCurrentMovablePiece(currentMovablePiece);
  };

  return (
    <div className={styles.piece}>
      { positionPieceMapping[position] &&
        <Image
          onClick={() => {
            movablePositions.includes(position) ? movePosition(position) : showMovablePostions(positionPieceMapping[position]);
          }}
          src={PieceImageMapping[positionPieceMapping[position]]}
          alt="chess piece"
          height={60}
          width={60}
          style={movablePositions.includes(position) && {cursor: 'pointer'}}
        />
      }

      {movablePositions.includes(position) && (
        <div
          className={positionPieceMapping[position] ? styles.blurredCircleCaptureParent : styles.blurredCircleParent }
          onClick={() => {
            movePosition(position);
          }}
        >
          <div
            className={!positionPieceMapping[position] && styles.blurredCircle}
          />
        </div>
      )}
    </div>
  );
};
export default Piece;
