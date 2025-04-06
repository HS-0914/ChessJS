import { games, newGame } from "./game.js";
import { comTurn } from "./api.js";

const whiteSquareGrey = "#a9a9a9";
const blackSquareGrey = "#696969";

export const boards = {};

function removeGreySquares(boardId) {
  $(`#${boardId} .square-55d63`).css("background", "");
}

function greySquare(boardId, square) {
  const $square = $(`#${boardId} .square-` + square);
  const background = $square.hasClass("black-3c85d")
    ? blackSquareGrey
    : whiteSquareGrey;
  $square.css("background", background);
}

function onDragStart(boardId, _source, piece) {
  const chess = games[boardId];
  if (
    chess.isGameOver() ||
    boardId !== "myBoard" ||
    (chess.turn() === "w" && piece.startsWith("b")) ||
    (chess.turn() === "b" && piece.startsWith("w"))
  ) {
    return false;
  }
}

function onDrop(boardId, source, target) {
  const chess = games[boardId];
  removeGreySquares(boardId);
  try {
    chess.move({ from: source, to: target, promotion: "q" });
  } catch {
    return "snapback";
  }
  setTimeout(() => comTurn(boardId), 250);
}

function onMouseoverSquare(boardId, square) {
  const chess = games[boardId];
  const moves = chess.moves({ square, verbose: true, promotion: "q" });
  if (moves.length === 0) return;
  greySquare(boardId, square);
  moves.forEach((m) => greySquare(boardId, m.to));
}

function onMouseoutSquare(boardId) {
  removeGreySquares(boardId);
}

export function updateBoardPosition(boardId) {
  const chess = games[boardId];
  const board = boards[boardId];
  board.position(chess.fen());
}

export function initBoard(boardId) {
  newGame(boardId);
  boards[boardId] = Chessboard(boardId, {
    draggable: true,
    position: "start",
    onDragStart: (source, piece) => onDragStart(boardId, source, piece),
    onDrop: (source, target) => onDrop(boardId, source, target),
    onMouseoverSquare: (square) => onMouseoverSquare(boardId, square),
    onMouseoutSquare: () => onMouseoutSquare(boardId),
    onSnapEnd: () => updateBoardPosition(boardId),
  });
}
