import { games, newGame } from "./game.js";
import { comTurn } from "./api.js";

const whiteSquareGrey = "#a9a9a9";
const blackSquareGrey = "#696969";

export const boards = {};
export const state = {
  pendingPromotion: null,
};
export const chessPuzzle = {
  puzzle: [],
  index: 0,
};

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
    (boardId === "myBoard" && chess.turn() === "b") ||
    (chess.turn() === "w" && piece.startsWith("b")) ||
    (chess.turn() === "b" && piece.startsWith("w"))
  ) {
    return false;
  }
}

function onDrop(boardId, source, target) {
  removeGreySquares(boardId);
  const chess = games[boardId];
  const tryMove = { from: source, to: target, promotion: "q" };
  const moves = chess.moves({ square: source, verbose: true });
  for (const move of moves) {
    if (move.to === target && move.isPromotion()) {
      state.pendingPromotion = { tryMove, boardId };
      const modal = new bootstrap.Modal(
        document.getElementById("promotionModal")
      );
      modal.show();
      return;
    }
  }
  return chessMove(boardId, chess, tryMove);
}

export function chessMove(boardId, chess, chessMove) {
  try {
    const moveObj = chess.move(chessMove);
    if (state.pendingPromotion) {
      updateBoardPosition(boardId);
      state.pendingPromotion = null;
    }
    if (boardId === "puzzleBoard") {
      if (moveObj.san == chessPuzzle.puzzle[chessPuzzle.index]) {
        if (++chessPuzzle.index === chessPuzzle.puzzle.length) {
          alert("Clear!");
          return;
        }
        setTimeout(() => {
          chess.move(chessPuzzle.puzzle[chessPuzzle.index++]);
          boards[boardId].position(chess.fen());
        }, 1000);
      } else {
        alert("다시 생각해보세요!");
        chess.undo();
        return "snapback";
      }
    }
  } catch {
    return "snapback";
  }
  if (chess.isGameOver()) {
    alert("🥳 Checkmate! You Win! 🥳");
    return;
  }
  if (boardId === "myBoard") {
    setTimeout(() => comTurn(boardId), 1000);
  }
}

export function checkPuzzle() {
  const chess = games["puzzleBoard"];
  if (chessPuzzle.index == chessPuzzle.puzzle.length) {
    setTimeout(() => {
      chessPuzzle.puzzle.forEach(() => chess.undo());
      updateBoardPosition("puzzleBoard");
      chessPuzzle.index = 0;
    }, 8000);
  } else {
    setTimeout(() => {
      chess.move(chessPuzzle.puzzle[chessPuzzle.index++]);
      boards["puzzleBoard"].position(chess.fen());
      checkPuzzle();
    }, 2000);
  }
}

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
}
