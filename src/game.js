import { Chess } from "chess.js";

export const games = {};

export function newGame(gameId) {
  games[gameId] = new Chess();
}

export function undoMove(boardId) {
  console.log(boardId);
  const chess = games[boardId];
  console.log(chess);
  if (chess.isGameOver()) {
    chess.undo();
  } else {
    chess.undo();
    chess.undo();
  }
  return chess.fen();
}
