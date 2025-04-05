import { game } from "./game.js";
import { comTurn } from "./api.js";

const whiteSquareGrey = "#a9a9a9";
const blackSquareGrey = "#696969";

export let board = null;

function removeGreySquares() {
  $("#myBoard .square-55d63").css("background", "");
}

function greySquare(square) {
  const $square = $("#myBoard .square-" + square);
  const background = $square.hasClass("black-3c85d")
    ? blackSquareGrey
    : whiteSquareGrey;
  $square.css("background", background);
}

function onDragStart(source, piece) {
  if (game.isGameOver()) return false;
  if (
    (game.turn() === "w" && piece.startsWith("b")) ||
    (game.turn() === "b" && piece.startsWith("w"))
  ) {
    return false;
  }
}

function onDrop(source, target) {
  removeGreySquares();
  try {
    game.move({ from: source, to: target, promotion: "q" });
  } catch {
    return "snapback";
  }
  setTimeout(comTurn, 250);
}

function onMouseoverSquare(square) {
  const moves = game.moves({ square, verbose: true });
  if (moves.length === 0) return;
  greySquare(square);
  moves.forEach((m) => greySquare(m.to));
}

function onMouseoutSquare() {
  removeGreySquares();
}

export function updateBoardPosition(fen) {
  board.position(fen);
}

export function initBoard() {
  board = Chessboard("myBoard", {
    draggable: true,
    position: "start",
    onDragStart,
    onDrop,
    onMouseoverSquare,
    onMouseoutSquare,
    onSnapEnd: () => updateBoardPosition(game.fen()),
  });
}
