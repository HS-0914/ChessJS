import { loadPuzzle } from "./api.js";
import { undoMove, games } from "./game.js";
import { updateBoardPosition, state, chessMove, checkPuzzle } from "./board.js";

export function initUI() {
  $("#depth, #thinkingTime").on("input", function () {
    const $this = $(this);
    const max = parseInt($this.attr("max"));
    const min = parseInt($this.attr("min"));
    let val = parseInt($this.val());

    if (val > max) $this.val(max);
    if (val < min || !val) $this.val(min);
  });

  $("#depth, #thinkingTime").on("change", function () {
    console.log(
      "Depth:",
      $("#depth").val(),
      ", Max Time:",
      $("#thinkingTime").val()
    );
  });

  $("#undoBtn").click(function () {
    undoMove("myBoard");
    updateBoardPosition("myBoard");
  });

  // jQuery로 클릭 이벤트 설정
  $("#startBtn").on("click", function () {
    const $target = $("#main");
    if ($target.length) {
      $("html, body").animate(
        {
          scrollTop: $target.offset().top,
        },
        600 // 부드럽게 0.6초 동안 스크롤
      );
    }
  });

  // jQuery로 클릭 이벤트 설정
  $("#puzzleBtn").on("click", function () {
    const $target = $("#puzzle");
    if ($target.length) {
      $("html, body").animate(
        {
          scrollTop: $target.offset().top,
        },
        600 // 부드럽게 0.6초 동안 스크롤
      );
    }
  });

  // 버튼 눌렀을 때 다시 로딩
  $("#reloadPuzzle").on("click", function () {
    loadPuzzle("puzzleBoard");
  });

  // 승격 기물 선택
  $(".promotion-piece").on("click", function () {
    const chosenPiece = $(this).data("piece"); // 'q', 'r', 'b', 'n'

    if (state.pendingPromotion) {
      const { tryMove, boardId } = state.pendingPromotion;
      tryMove.promotion = chosenPiece;

      const chess = games[boardId];
      chessMove(boardId, chess, tryMove);
    }
    $("#promotionModal").hide();
  });

  $("#checkPuzzle").on("click", () => {
    console.log("checkPuzzle");
    checkPuzzle();
  });
}
