import { initBoard } from "./board.js";
import { initUI } from "./ui.js";
import { loadPuzzle, randomChess } from "./api.js";

$(document).ready(function () {
  const boardIds = ["aiBoard", "myBoard", "puzzleBoard"];
  for (const id of boardIds) {
    initBoard(id);
  }
  loadPuzzle("puzzleBoard");
  initUI();
  setTimeout(() => randomChess("aiBoard"), 3000);
});
