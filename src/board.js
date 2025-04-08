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
    boardId === "aiBoard" ||
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
  if (boardId === "puzzleBoard") {
    checkPuzzle();
  }

  if (boardId !== "myBoard") return;
  if (chess.isGameOver()) {
    alert("Checkmate!");
  }
}

function checkPuzzle() {}

function onMouseoverSquare(boardId, square) {
  const chess = games[boardId];
  const moves = chess.moves({ square, verbose: true });
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
  // checkmate test
  // if (boardId === "myBoard") {
  //   games[boardId].load("6k1/5ppp/8/8/8/8/5PPP/3QR1K1 w - - 0 1", {
  //     skipValidation: true,
  //   });
  //   boards[boardId].position(games[boardId].fen());
  // }
}
