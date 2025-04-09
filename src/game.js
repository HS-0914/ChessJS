import { Chess } from "chess.js";

export const games = {};

export function newGame(gameId) {
  games[gameId] = new Chess();
}

export function undoMove(boardId) {
  const chess = games[boardId];
  chess.undo();
  chess.undo();
  return chess.fen();
}
