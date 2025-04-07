import React, { useState } from "react";
import Image from "next/image";
import { PieceImageMapping } from "../constants";
import styles from "./styles.module.css";

function Square({ squareNumber, positionToPieceMapping, isTarget }) {
  return (
    <div className={styles.piece}>
      {positionToPieceMapping[squareNumber] && (
        <Image
          src={PieceImageMapping[positionToPieceMapping[squareNumber]]}
          priority={true}
          alt="chess piece"
          height={60}
          width={60}
        />
      )}

      {isTarget && (
        <div className={styles.blurredCircleParent}>
          <div className={styles.blurredCircle} />
        </div>
      )}
    </div>
  );
}

export default Square;
