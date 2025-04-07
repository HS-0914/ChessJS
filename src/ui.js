import { undoMove } from "./game.js";
import { updateBoardPosition } from "./board.js";

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
}
