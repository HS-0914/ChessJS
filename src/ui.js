import { undoMove, game } from "./game.js";
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
    undoMove();
    const newFen = undoMove();
    updateBoardPosition(newFen);
  });
}
