Chess AI 프로젝트 정리 및 시작 메시지
안녕하세요,
이 대화는 Chess.js 기반 AI 체스 게임 프론트엔드 개발 프로젝트에 대한 전체 흐름과 구조, 그리고 코드 분리 및 개선 작업에 관한 내용을 정리한 내용입니다. 아래 내용을 참고해서 앞으로의 대화나 작업 진행 시 기본 자료로 활용할 수 있습니다.

1. 프로젝트 개요
   목표:
   HTML, CSS, JavaScript, jQuery, AJAX를 사용하여 체스판을 구현하고, 체스 API와 통신하여 AI와 대결할 수 있는 체스 게임 웹 프론트엔드를 제작합니다.

주요 기능:

체스판 표시 및 체스말 이동 (chessboard.js 사용)

chess.js 라이브러리로 체스 규칙 관리 (체크, 체크메이트, 스테일메이트 등)

AI(체스 API)를 통한 컴퓨터 수 계산 및 응답 처리

depth 및 maxThinkingTime 등의 파라미터 입력 UI 제공

되돌리기(undo) 기능

2. 모듈화된 코드 구조 및 폴더 구성
   프로젝트는 다음과 같이 모듈화하여 관리합니다:

cpp
복사
편집
/src
├── api.js // 체스 API 호출 처리 (기존 ai.js → api.js)
├── board.js // 체스판 초기화 및 이벤트 처리 (드래그, 드롭, 마우스오버 등)
├── game.js // 체스 게임 상태 관리 (chess.js 라이브러리 활용, move/undo 등)
├── ui.js // UI 이벤트 처리 (입력 필드 제어, 버튼 클릭 등)
└── index.js // 진입점; 문서 준비 완료 시 모듈 초기화 (initBoard, initUI 호출)
HTML 파일에서는

<script type="module" src="/src/index.js"></script> 만 불러오면, index.js가 나머지 모듈들을 import하여 전체 기능을 구성합니다.

3. 주요 코드 스니펫
   game.js
   js
   복사
   편집
   import { Chess } from "chess.js";
   export const game = new Chess();

export function undoMove() {
game.undo();
return game.fen();
}
api.js (이전 ai.js)
js
복사
편집
import { game } from "./game.js";
import { updateBoardPosition } from "./board.js";

export function comTurn() {
$.ajax({
url: "https://chess-api.com/v1",
method: "POST",
headers: { "Content-Type": "application/json" },
data: JSON.stringify({ fen: game.fen(), variants: 1 }),
success: function (res) {
game.move(res.san);
updateBoardPosition(game.fen());
},
error: function (error) {
console.log("에러 : ", error);
},
});
}
board.js
js
복사
편집
import { game } from "./game.js";
import { comTurn } from "./api.js";

export let board = null;
const whiteSquareGrey = "#a9a9a9";
const blackSquareGrey = "#696969";

function removeGreySquares() {
$("#myBoard .square-55d63").css("background", "");
}
function greySquare(square) {
const $square = $("#myBoard .square-" + square);
const background = $square.hasClass("black-3c85d") ? blackSquareGrey : whiteSquareGrey;
$square.css("background", background);
}
function onDragStart(source, piece) {
if (game.isGameOver()) return false;
if ((game.turn() === "w" && piece.startsWith("b")) ||
(game.turn() === "b" && piece.startsWith("w"))) return false;
}
function onDrop(source, target) {
removeGreySquares();
try {
game.move({ from: source, to: target, promotion: "q" });
} catch {
return "snapback";
}
setTimeout(comTurn, 250);
}
function onMouseoverSquare(square) {
const moves = game.moves({ square, verbose: true });
if (moves.length === 0) return;
greySquare(square);
moves.forEach(m => greySquare(m.to));
}
function onMouseoutSquare() {
removeGreySquares();
}

export function updateBoardPosition(fen) {
board.position(fen);
}
export function initBoard() {
board = Chessboard("myBoard", {
draggable: true,
position: "start",
onDragStart,
onDrop,
onMouseoverSquare,
onMouseoutSquare,
onSnapEnd: () => updateBoardPosition(game.fen()),
});
}
ui.js
js
복사
편집
import { undoMove } from "./game.js";
import { updateBoardPosition } from "./board.js";

export function initUI() {
$("#depth, #thinkingTime").on("input", function () {
    const $this = $(this);
    const max = parseInt($this.attr("max"));
const min = parseInt($this.attr("min"));
    let val = parseInt($this.val());

    if (val > max) $this.val(max);
    if (val < min) $this.val(min);

});

$("#depth, #thinkingTime").on("change", function () {
console.log("Depth:", $("#depth").val(), ", Max Time:", $("#thinkingTime").val());
});

$("#undoBtn").click(function () {
const newFen = undoMove();
updateBoardPosition(newFen);
});
}
index.js
js
복사
편집
import { initBoard } from "./board.js";
import { initUI } from "./ui.js";

$(document).ready(function () {
initBoard();
initUI();
}); 4. 대화 및 진행 상황 요약
초기 논의:

체스판 구현 및 체스 API 연동에 대한 요구사항을 정리함

chess.js, chessboard.js, jQuery 등을 활용한 체스 게임 개발 아이디어 공유

코드 모듈화:

한 파일에 모든 기능이 포함되어 있었던 기존 chess.js를 역할별로 모듈화

API 호출 모듈은 api.js로 명칭 변경하여 역할을 명확하게 함

HTML 파일 구성:

<script type="module" src="/src/index.js"></script>로 진입점만 불러와 전체 모듈 연결

UI 개선:

입력 필드에 대해 max/min 값 제한을 JavaScript로 처리하는 로직 추가

불필요한 import 정리 등 코드 최적화 진행

추가 자동화:

폴더/파일 자동 생성 스크립트를 통해 반복 작업 최소화 경험 공유
