import { initBoard } from "./board.js";
import { initUI } from "./ui.js";
import { randomChess } from "./api.js";

$(document).ready(function () {
  // initBoard();
  initBoard("aiBoard");
  initBoard("myBoard");
  initUI();
  setTimeout(() => randomChess("aiBoard"), 3000);
});
