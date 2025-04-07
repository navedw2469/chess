function getPositionToPieceMapping(notation) {
  let positions = notation.split(" ")[0].split("/");

  let pieceEncoding = {
    e: 0,
    p: 1 | 8,
    n: 2 | 8,
    b: 3 | 8,
    r: 4 | 8,
    q: 5 | 8,
    k: 6 | 8,
    P: 1 | 16,
    N: 2 | 16,
    B: 3 | 16,
    R: 4 | 16,
    Q: 5 | 16,
    K: 6 | 16,
  };

  let mapping = {};

  for (let row = 0; row < 8; row++) {
    for (let col = 0, i = 0; col < 8; ) {
      if (isNaN(positions[row][i])) {
        mapping[8 * row + col] = pieceEncoding[positions[row][i]];
        i++;
        col++;
      } else {
        col += +positions[row][i];
        i++;
      }
    }
  }
  return mapping;
}

export { getPositionToPieceMapping };
