import whitePawnPng from "./Images/whitePawn.png";
import whiteKnightPng from "./Images/whiteKnight.png";
import whiteRookPng from "./Images/whiteRook.png";
import whiteBishopPng from "./images/whiteBishop.png";
import whiteQueenPng from "./Images/whiteQueen.png";
import whiteKingPng from "./Images/whiteKing.png";

import blackPawnPng from "./Images/blackPawn.png";
import blackKnightPng from "./Images/blackKnight.png";
import blackRookPng from "./Images/blackRook.png";
import blackBishopPng from "./images/blackBishop.png";
import blackQueenPng from "./Images/blackQueen.png";
import blackKingPng from "./Images/blackKing.png";

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
