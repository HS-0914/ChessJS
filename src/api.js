import { games } from "./game.js";
import {
  boards,
  updateBoardPosition,
  chessPuzzle,
  initBoard,
} from "./board.js";

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
      const tempFen = chess.fen();
      const san = res.san;
      chess.move(san);
      if (chess.isGameOver()) {
        alert("YOU DIED");
      }
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
  // exit if the game is over
  if (chess.isGameOver()) {
    setTimeout(() => {
      initBoard("aiBoard");
    }, 10000);
  }

  const possibleMoves = chess.moves();

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
      console.log(data);
      const { fen, title, url, pgn } = data;
      const board = boards[boardId];
      const chess = games[boardId];
      const { mainMoves, variations } = parsePGNWithVariations(pgn);
      chessPuzzle.puzzle = mainMoves;
      chessPuzzle.index = 0;
      console.log(mainMoves);
      console.log(variations);
      $("#puzzleTitle").text(title);
      $("#puzzleLink").attr("href", url);
      board.position(fen);
      chess.load(fen);
      if (chess.turn() === "b") {
        board.orientation("black");
      } else {
        board.orientation("white");
      }
    },
    error: (error) => {
      console.error(error);
    },
  });
}
function cleanText(text) {
  return text
    .replace(/\r?\n/g, " ") // 줄바꿈 → 공백
    .replace(/\[.*?\]/g, "") // PGN 메타데이터 제거
    .replace(/\$\d+/g, "") // $3 같은 평가기호 제거
    .replaceAll(/(1-0|0-1|1\/2-1\/2|\*)/g, "") // 결과 제거
    .replace(/\s+/g, " ") // 연속 공백 → 하나로
    .replace(/\d+\.+/g, "") // 수 번호 제거 (1. 2... 등)
    .replace(/\.\.\./g, "")
    .trim();
}

function parsePGNWithVariations(pgn) {
  const cleaned = cleanText(pgn);
  const variations = [];

  // 괄호 안 variation 추출
  const variationRegex = /\((.*?)\)/g;
  for (const match of cleaned.matchAll(variationRegex)) {
    const variationMoves = match[1].split(" ").filter(Boolean);
    variations.push(variationMoves);
  }

  // 메인 수만 남기고 파싱
  const mainMoves = cleaned
    .replaceAll(/\(.*?\)/g, "") // 모든 괄호 내용 제거
    .split(" ")
    .filter(Boolean);

  return {
    mainMoves,
    variations,
  };
}
/**
1. Nb6 $3 1... Nxb6 2. Rc7 $3 2... Qxc7 (2... h5 3. Qh3) (2... Qe8 3. Qxe6+ Kh8

4. Rxe7 Qxe7 5. Bb2+ Qg7 6. Nf7+ Kg8 7. Nh6+ Kh8 8. Qg8#) 3. Qxe6+ Kg7 (3...

Kh8 4. Bb2+ Bg7 5. Nf7+ Kg8 6. Nh6+ Kh8 7. Qg8+ Rxg8 8. Nf7#) 4. Bb2+ Kh6 5.

Qh3+ Kxg5 6. f4# *
 */
