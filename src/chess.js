// NOTE: this example uses the chess.js library:
// https://github.com/jhlywa/chess.js
import { Chess } from "chess.js";

const game = new Chess();
const whiteSquareGrey = "#a9a9a9";
const blackSquareGrey = "#696969";

const config = {
  draggable: true,
  position: "start",
  onDragStart: onDragStart,
  onDrop: onDrop,
  onMouseoutSquare: onMouseoutSquare,
  onMouseoverSquare: onMouseoverSquare,
  onSnapEnd: onSnapEnd,
};

const board = Chessboard("myBoard", config);

function comTurn() {
  $.ajax({
    url: "https://chess-api.com/v1",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      fen: game.fen(),
    }),
    success: function (res) {
      console.log(res);
      const san = res.san;
      game.move(san);
      board.position(game.fen());
    },
    error: function (error) {
      console.log("에러 : ", error);
    },
  });
}

function removeGreySquares() {
  $("#myBoard .square-55d63").css("background", "");
}

function greySquare(square) {
  const $square = $("#myBoard .square-" + square);

  let background = whiteSquareGrey;
  if ($square.hasClass("black-3c85d")) {
    background = blackSquareGrey;
  }

  $square.css("background", background);
}

function onDragStart(source, piece) {
  // do not pick up pieces if the game is over
  if (game.isGameOver()) return false;

  // or if it's not that side's turn
  if (
    (game.turn() === "w" && piece.search(/^b/) !== -1) ||
    (game.turn() === "b" && piece.search(/^w/) !== -1)
  ) {
    return false;
  }
}

function onDrop(source, target) {
  removeGreySquares();

  // see if the move is legal
  try {
    const move = game.move({
      from: source,
      to: target,
      promotion: "q", // NOTE: always promote to a queen for example simplicity
    });
  } catch (error) {
    console.log(error);
    // illegal move
    return "snapback";
  }

  window.setTimeout(comTurn, 250);
}

function onMouseoverSquare(square, piece) {
  // get list of possible moves for this square
  const moves = game.moves({
    square: square,
    verbose: true,
  });

  // exit if there are no moves available for this square
  if (moves.length === 0) return;

  // highlight the square they moused over
  greySquare(square);

  // highlight the possible squares for this piece
  for (var i = 0; i < moves.length; i++) {
    greySquare(moves[i].to);
  }
}

function onMouseoutSquare(square, piece) {
  removeGreySquares();
}

function onSnapEnd() {
  board.position(game.fen());
}

// =============================================================================================
// 추가적인 UI 이벤트 핸들러 구현
$(document).ready(function () {
  // depth/maxThinkingTime 값 변경 시 제한 검사
  $("#depth, #thinkingTime").on("input", function () {
    const $this = $(this);
    const max = parseInt($this.attr("max"), 10);
    const min = parseInt($this.attr("min"), 10);
    let val = parseInt($this.val(), 10);

    if (val > max) $this.val(max);
    if (val < min) $this.val(min);
  });

  // depth와 maxThinkingTime 입력값이 변경되면
  $("#depth, #thinkingTime").on("change", function () {
    // AJAX 호출 시 전달할 파라미터 업데이트 (예: global config 변수에 저장)
    const depth = $("#depth").val();
    const maxThinkingTime = $("#thinkingTime").val();
    console.log(
      "업데이트된 파라미터 - Depth:",
      depth,
      ", Max Thinking Time:",
      maxThinkingTime
    );
    // 실제 API 호출 시 해당 값들을 data에 포함하여 보내도록 구현하세요.
  });

  // 되돌리기 버튼 클릭 이벤트 처리
  $("#undoBtn").click(function () {
    // chess.js 라이브러리의 undo() 함수를 호출하여 마지막 수를 되돌림
    // 예시: game.undo();
    // 실제 동작 구현은 chess.js 인스턴스와 연결하여 처리해야 합니다.
    alert("되돌리기 기능은 chess.js의 undo 메서드를 활용하여 구현합니다.");
  });
});
