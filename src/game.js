import { Chess } from "chess.js";

export const games = {};

export function newGame(gameId) {
  games[gameId] = new Chess();
}

export function undoMove(boardId) {
  const chess = games[boardId];
  if (chess.isGameOver()) {
    chess.undo();
  } else {
    chess.undo();
    chess.undo();
  }
  return chess.fen();
}
