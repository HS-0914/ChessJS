import { games } from "./game.js";
import { boards, updateBoardPosition } from "./board.js";

export function comTurn(boardId) {
  const depth = Number($("#depth").val());
  const maxThinkingTime = Number($("#thinkingTime").val());
  const chess = games[boardId];
  $("#undoBtn").prop("disabled", false); // 요청 전 비활성화
  $.ajax({
    url: "https://chess-api.com/v1",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify({
      fen: chess.fen(),
      depth,
      maxThinkingTime,
    }),
    success: function (res) {
      console.log(res);
      const san = res.san;
      chess.move(san);
      updateBoardPosition(boardId);
    },
    error: function (error) {
      console.log("에러 : ", error);
    },
    complete: () => {
      $("#undoBtn").prop("disabled", false); // 성공/실패 후 다시 활성화
    },
  });
}

export function randomChess(boardId) {
  const chess = games[boardId];
  const board = boards[boardId];
  const possibleMoves = chess.moves();
  // exit if the game is over
  if (chess.isGameOver()) return;

  const randomIdx = Math.floor(Math.random() * possibleMoves.length);
  chess.move(possibleMoves[randomIdx]);
  board.position(chess.fen());

  setTimeout(() => randomChess(boardId), 2000);
}

export function loadPuzzle(boardId) {
  $.ajax({
    url: "https://api.chess.com/pub/puzzle/random",
    method: "GET",
    success: (data) => {
      const { fen, title, url } = data;
      $("#puzzleTitle").text(title);
      $("#puzzleLink").attr("href", url);
      boards[boardId].position(fen);
    },
    error: (error) => {
      console.error(error);
    },
  });
}
