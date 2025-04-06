import whitePawnPng from "./Images/whitePawn.png"
import whiteKnightPng from "./Images/whiteKnight.png"
import whiteRookPng from "./Images/whiteRook.png"
import whiteBishopPng from "./images/whiteBishop.png";
import whiteQueenPng from "./Images/whiteQueen.png";
import whiteKingPng from "./Images/whiteKing.png";

import blackPawnPng from "./Images/blackPawn.png"
import blackKnightPng from "./Images/blackKnight.png"
import blackRookPng from "./Images/blackRook.png"
import blackBishopPng from "./images/blackBishop.png";
import blackQueenPng from "./Images/blackQueen.png";
import blackKingPng from "./Images/blackKing.png";

const WhitePawn = ["whitePawn1", "whitePawn2", "whitePawn3", "whitePawn4", "whitePawn5", "whitePawn6", "whitePawn7", "whitePawn8"];
const BlackPawn = ["blackPawn1", "blackPawn2", "blackPawn3", "blackPawn4", "blackPawn5", "blackPawn6", "blackPawn7", "blackPawn8"];

const Rook = ["whiteRook1", "whiteRook2", "blackRook1", "blackRook2"]
const Bishop = ["whiteBishop1", "whiteBishop2", "blackBishop1", "blackBishop2"]
const Knight = ["whiteKnight1", "whiteKnight2", "blackKnight1", "blackKnight2"]
const Queen = ["whiteQueen1", "blackQueen1"]
const King = ["whiteKing1", "blackKing1"]

const InitialPiecePositionMapping = {
  whitePawn1: "a2",
  whitePawn2: "b2",
  whitePawn3: "c2",
  whitePawn4: "d2",
  whitePawn5: "e2",
  whitePawn6: "f2",
  whitePawn7: "g2",
  whitePawn8: "h2",
  blackPawn1: "a7",
  blackPawn2: "b7",
  blackPawn3: "c7",
  blackPawn4: "d7",
  blackPawn5: "e7",
  blackPawn6: "f7",
  blackPawn7: "g7",
  blackPawn8: "h7",
  whiteRook1: "a1",
  whiteRook2: "h1",
  blackRook1: "a8", 
  blackRook2: "h8",
  whiteBishop1: "c1", 
  whiteBishop2: "f1", 
  blackBishop1: "c8", 
  blackBishop2: "f8",
  whiteKnight1: "b1", 
  whiteKnight2: "g1", 
  blackKnight1: "b8", 
  blackKnight2: "g8",
  whiteQueen1: "d1", 
  blackQueen1: "d8",
  whiteKing1: "e1", 
  blackKing1: "e8"
}

const InitialPositionPieceMapping = Object.entries(InitialPiecePositionMapping).reduce((acc, key) =>{
  return { ...acc, [key[1]]: key[0] }
}, {})

const PieceImageMapping = {
  whitePawn1: whitePawnPng,
  whitePawn2: whitePawnPng,
  whitePawn3: whitePawnPng,
  whitePawn4: whitePawnPng,
  whitePawn5: whitePawnPng,
  whitePawn6: whitePawnPng,
  whitePawn7: whitePawnPng,
  whitePawn8: whitePawnPng,
  blackPawn1: blackPawnPng,
  blackPawn2: blackPawnPng,
  blackPawn3: blackPawnPng,
  blackPawn4: blackPawnPng,
  blackPawn5: blackPawnPng,
  blackPawn6: blackPawnPng,
  blackPawn7: blackPawnPng,
  blackPawn8: blackPawnPng,
  whiteRook1: whiteRookPng,
  whiteRook2: whiteRookPng,
  blackRook1: blackRookPng,
  blackRook2: blackRookPng,
  whiteBishop1: whiteBishopPng,
  whiteBishop2: whiteBishopPng, 
  blackBishop1: blackBishopPng, 
  blackBishop2: blackBishopPng,
  whiteKnight1: whiteKnightPng, 
  whiteKnight2: whiteKnightPng, 
  blackKnight1: blackKnightPng, 
  blackKnight2: blackKnightPng,
  whiteQueen1: whiteQueenPng, 
  blackQueen1: blackQueenPng,
  whiteKing1: whiteKingPng, 
  blackKing1: blackKingPng
}

const IsPieceMoved = {
  whiteKing: false,
  blackKing: false,
  whiteRook1: false,
  whiteRook2: false,
  blackRook1: false,
  blackRook2: false
}

export {WhitePawn, BlackPawn, King, Queen, Knight, Rook, Bishop, InitialPiecePositionMapping, InitialPositionPieceMapping, PieceImageMapping, IsPieceMoved};