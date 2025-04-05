import { game } from "./game.js";
import { updateBoardPosition } from "./board.js";

export function comTurn() {
  const depth = Number($("#depth").val());
  const maxThinkingTime = Number($("#thinkingTime").val());

  $.ajax({
    url: "https://chess-api.com/v1",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify({
      fen: game.fen(),
      depth,
      maxThinkingTime,
    }),
    success: function (res) {
      const san = res.san;
      game.move(san);
      updateBoardPosition(game.fen());
    },
    error: function (error) {
      console.log("에러 : ", error);
    },
  });
}
