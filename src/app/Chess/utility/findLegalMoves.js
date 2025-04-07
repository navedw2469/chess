import { PieceEncoding } from "../constants";

const pawnLegalMoves = (
  positionToPieceMapping,
  currentPosition,
  currentColor,
  enPassantPawnPos
) => {
  let opponentColor =
    currentColor == PieceEncoding.black
      ? PieceEncoding.white
      : PieceEncoding.black;
  let currentPositionx = Math.floor(currentPosition / 8),
    currentPositiony = currentPosition % 8;
  let legalMoves = [];

  if (currentColor == PieceEncoding.black && currentPositionx + 1 < 8) {
    if (!positionToPieceMapping[(currentPositionx + 1) * 8 + currentPositiony])
      legalMoves.push((currentPositionx + 1) * 8 + currentPositiony);

    if (
      currentPositiony + 1 < 8 &&
      positionToPieceMapping[
        (currentPositionx + 1) * 8 + currentPositiony + 1
      ] & opponentColor
    ) {
      legalMoves.push((currentPositionx + 1) * 8 + currentPositiony + 1);
    }

    if (
      currentPositiony + 1 < 8 &&
      currentPositionx * 8 + currentPositiony + 1 == enPassantPawnPos
    ) {
      legalMoves.push((currentPositionx + 1) * 8 + currentPositiony + 1);
    }

    if (
      currentPositiony - 1 >= 0 &&
      positionToPieceMapping[
        (currentPositionx + 1) * 8 + currentPositiony - 1
      ] & opponentColor
    ) {
      legalMoves.push((currentPositionx + 1) * 8 + currentPositiony - 1);
    }

    if (
      currentPositiony - 1 >= 0 &&
      currentPositionx * 8 + currentPositiony - 1 == enPassantPawnPos
    ) {
      legalMoves.push((currentPositionx + 1) * 8 + currentPositiony - 1);
    }

    if (
      currentPositionx == 1 &&
      !positionToPieceMapping[(currentPositionx + 2) * 8 + currentPositiony]
    ) {
      legalMoves.push((currentPositionx + 2) * 8 + currentPositiony);
    }
  }

  if (currentColor == PieceEncoding.white && currentPositionx - 1 >= 0) {
    if (!positionToPieceMapping[(currentPositionx - 1) * 8 + currentPositiony])
      legalMoves.push((currentPositionx - 1) * 8 + currentPositiony);

    if (
      currentPositiony + 1 < 8 &&
      positionToPieceMapping[
        (currentPositionx - 1) * 8 + currentPositiony + 1
      ] & opponentColor
    ) {
      legalMoves.push((currentPositionx - 1) * 8 + currentPositiony + 1);
    }

    if (
      currentPositiony + 1 < 8 &&
      currentPositionx * 8 + currentPositiony + 1 == enPassantPawnPos
    ) {
      legalMoves.push((currentPositionx - 1) * 8 + currentPositiony + 1);
    }

    if (
      currentPositiony - 1 >= 0 &&
      positionToPieceMapping[
        (currentPositionx - 1) * 8 + currentPositiony - 1
      ] & opponentColor
    ) {
      legalMoves.push((currentPositionx - 1) * 8 + currentPositiony - 1);
    }

    if (
      currentPositiony - 1 >= 0 &&
      currentPositionx * 8 + currentPositiony - 1 == enPassantPawnPos
    ) {
      legalMoves.push((currentPositionx - 1) * 8 + currentPositiony - 1);
    }

    if (
      currentPositionx == 6 &&
      !positionToPieceMapping[(currentPositionx - 2) * 8 + currentPositiony]
    ) {
      legalMoves.push((currentPositionx - 2) * 8 + currentPositiony);
    }
  }

  return legalMoves;
};

const knightLegalMoves = (
  positionToPieceMapping,
  currentPosition,
  currentColor
) => {
  let legalMoves = [];
  let dir = [2, 1, 2, -1, -2, 1, -2, -1, 1, 2, 1, -2, -1, 2, -1, -2];
  let currentPositionx = Math.floor(currentPosition / 8),
    currentPositiony = currentPosition % 8;

  for (let d = 0; d < 8; d++) {
    let targetx = currentPositionx + dir[2 * d];
    let targety = currentPositiony + dir[2 * d + 1];
    let target = targetx * 8 + targety;
    let targetColor =
      positionToPieceMapping[target] &
      (PieceEncoding.black | PieceEncoding.white);

    if (
      targetx < 0 ||
      targety < 0 ||
      targetx >= 8 ||
      targety >= 8 ||
      currentColor == targetColor
    )
      continue;

    legalMoves.push(target);
  }

  return legalMoves;
};

const castelingLegalMoves = (
  positionToPieceMapping,
  currentPosition,
  currentColor,
  casteling = {}
) => {
  let legalMoves = [];
  console.log(casteling, "c");
  if (
    currentColor == PieceEncoding.black &&
    casteling.q == false &&
    casteling.k == false
  ) {
    return [];
  }

  if (
    currentColor == PieceEncoding.white &&
    casteling.Q == false &&
    casteling.K == false
  ) {
    return [];
  }

  if (currentColor == PieceEncoding.black && casteling.q) {
    let ok = true;
    for (let x = 1; x <= 3; x++) {
      if (positionToPieceMapping[x]) {
        ok = false;
        break;
      }
    }

    if (ok) {
      legalMoves.push(2);
    }
  }

  if (currentColor == PieceEncoding.black && casteling.k) {
    let ok = true;
    for (let x = 5; x <= 6; x++) {
      if (positionToPieceMapping[x]) {
        ok = false;
        break;
      }
    }

    if (ok) {
      legalMoves.push(6);
    }
  }

  if (currentColor == PieceEncoding.white && casteling.Q) {
    let ok = true;
    for (let x = 57; x <= 59; x++) {
      if (positionToPieceMapping[x]) {
        ok = false;
        break;
      }
    }

    if (ok) {
      legalMoves.push(58);
    }
  }

  if (currentColor == PieceEncoding.white && casteling.K) {
    let ok = true;
    for (let x = 61; x <= 62; x++) {
      if (positionToPieceMapping[x]) {
        ok = false;
        break;
      }
    }

    if (ok) {
      legalMoves.push(62);
    }
  }

  return legalMoves;
};

function findMoves(
  positionToPieceMapping,
  currentPosition,
  currentColor,
  enPassantPawnPos,
  casteling
) {
  let color =
    positionToPieceMapping[currentPosition] &
    (PieceEncoding.black | PieceEncoding.white);

  let legalMoves = [];

  if (color != currentColor || !positionToPieceMapping[currentPosition])
    return legalMoves;

  let piece = positionToPieceMapping[currentPosition] & 7;

  let currentPositionx = Math.floor(currentPosition / 8),
    currentPositiony = currentPosition % 8;

  if (piece == PieceEncoding.pawn) {
    return pawnLegalMoves(
      positionToPieceMapping,
      currentPosition,
      currentColor,
      enPassantPawnPos
    );
  }

  if (piece == PieceEncoding.knight) {
    return knightLegalMoves(
      positionToPieceMapping,
      currentPosition,
      currentColor
    );
  }

  if (piece == PieceEncoding.king) {
    legalMoves = castelingLegalMoves(
      positionToPieceMapping,
      currentPosition,
      currentColor,
      casteling
    );
  }

  let streightDir = [0, 1, 0, -1, 1, 0, -1, 0];
  let diagonalDir = [1, 1, 1, -1, -1, 1, -1, -1];
  let limit = piece == PieceEncoding.king ? 2 : 8;
  let r = piece != PieceEncoding.bishop;
  let b = piece != PieceEncoding.rook;

  for (let dir = 0; dir < 4; dir++) {
    for (let m = 1; m < limit * r; m++) {
      let dx = streightDir[dir * 2] * m;
      let dy = streightDir[dir * 2 + 1] * m;

      let targetx = currentPositionx + dx;
      let targety = currentPositiony + dy;
      let target = targetx * 8 + targety;
      let targetColor =
        positionToPieceMapping[target] &
        (PieceEncoding.black | PieceEncoding.white);
      if (
        targetx < 0 ||
        targety < 0 ||
        targetx >= 8 ||
        targety >= 8 ||
        currentColor == targetColor
      )
        break;

      legalMoves.push(target);
      if (targetColor && currentColor != targetColor) break;
    }

    for (let m = 1; m < limit * b; m++) {
      let dx = diagonalDir[dir * 2] * m;
      let dy = diagonalDir[dir * 2 + 1] * m;

      let targetx = currentPositionx + dx;
      let targety = currentPositiony + dy;
      let target = targetx * 8 + targety;
      let targetColor =
        positionToPieceMapping[target] &
        (PieceEncoding.black | PieceEncoding.white);

      if (
        targetx < 0 ||
        targety < 0 ||
        targetx >= 8 ||
        targety >= 8 ||
        currentColor == targetColor
      )
        break;

      legalMoves.push(target);
      if (targetColor && currentColor != targetColor) break;
    }
  }

  return legalMoves;
}

function generateThreatMap(positionToPieceMapping, currentColor) {
  let opponentColor =
    currentColor == PieceEncoding.black
      ? PieceEncoding.white
      : PieceEncoding.black;

  let threatMap = [];

  Object.keys(positionToPieceMapping).forEach((pos) => {
    let moves = findMoves(positionToPieceMapping, pos, opponentColor);
    threatMap = [...threatMap, ...moves];
  });

  return threatMap;
}

function findKingPos(positionToPieceMapping, currentColor) {
  const kingCode = PieceEncoding.king | currentColor;
  for (const pos in positionToPieceMapping) {
    if (positionToPieceMapping[pos] === kingCode) return Number(pos);
  }
  return -1;
}

function findAllLegalMoves(
  positionToPieceMapping,
  currentColor,
  enPassantPawnPos,
  casteling = {}
) {
  let allLegalMoves = {};
  Object.keys(positionToPieceMapping).forEach((pos) => {
    let moves = findMoves(
      positionToPieceMapping,
      pos,
      currentColor,
      enPassantPawnPos,
      casteling
    );
    let legalMoves = moves.filter((move) => {
      let newPos = {
        ...positionToPieceMapping,
        [move]: positionToPieceMapping[pos],
        [pos]: undefined,
      };
      let threatMap = generateThreatMap(newPos, currentColor);
      let kingPos = findKingPos(newPos, currentColor);
      return !threatMap.includes(kingPos);
    });
    if (legalMoves.length) allLegalMoves[pos] = legalMoves;
  });
  return allLegalMoves;
}

export { findAllLegalMoves };
