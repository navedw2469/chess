import whitePawnPng from "./images/whitePawn.png";
import whiteKnightPng from "./images/whiteKnight.png";
import whiteRookPng from "./images/whiteRook.png";
import whiteBishopPng from "./images/whiteBishop.png";
import whiteQueenPng from "./images/whiteQueen.png";
import whiteKingPng from "./images/whiteKing.png";

import blackPawnPng from "./images/blackPawn.png";
import blackKnightPng from "./images/blackKnight.png";
import blackRookPng from "./images/blackRook.png";
import blackBishopPng from "./images/blackBishop.png";
import blackQueenPng from "./images/blackQueen.png";
import blackKingPng from "./images/blackKing.png";

const PieceEncoding = {
  empty: 0,
  pawn: 1,
  knight: 2,
  bishop: 3,
  rook: 4,
  queen: 5,
  king: 6,
  black: 8,
  white: 16,
};

const PieceImageMapping = {
  [PieceEncoding.pawn | PieceEncoding.white]: whitePawnPng,
  [PieceEncoding.pawn | PieceEncoding.black]: blackPawnPng,
  [PieceEncoding.rook | PieceEncoding.white]: whiteRookPng,
  [PieceEncoding.rook | PieceEncoding.black]: blackRookPng,
  [PieceEncoding.bishop | PieceEncoding.white]: whiteBishopPng,
  [PieceEncoding.bishop | PieceEncoding.black]: blackBishopPng,
  [PieceEncoding.knight | PieceEncoding.white]: whiteKnightPng,
  [PieceEncoding.knight | PieceEncoding.black]: blackKnightPng,
  [PieceEncoding.queen | PieceEncoding.white]: whiteQueenPng,
  [PieceEncoding.queen | PieceEncoding.black]: blackQueenPng,
  [PieceEncoding.king | PieceEncoding.white]: whiteKingPng,
  [PieceEncoding.king | PieceEncoding.black]: blackKingPng,
};

export { PieceImageMapping, PieceEncoding };
