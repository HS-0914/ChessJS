import { Chess } from "chess.js";

export const game = new Chess();

export function undoMove() {
  game.undo();
  return game.fen();
}
