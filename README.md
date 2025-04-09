♟️ ChessJS - 웹 기반 체스 게임 & 퍼즐 플레이
인공지능과의 실시간 대전부터 실제 체스 퍼즐 풀이까지 지원하는 웹 체스 플랫폼입니다.
사용자 친화적인 인터페이스와 다양한 모드를 제공하며, 체스 교육과 연습에 적합한 웹 애플리케이션입니다.

🧩 주요 기능
✅ 1. AI와 1:1 대국
chess.js 엔진을 활용하여 체스 룰 기반의 게임 상태 관리

chess-api.com API를 통해 AI의 다음 수 계산

사용자는 Depth, Thinking Time(ms)을 조절하여 난이도 조정 가능

✅ 2. 체스 퍼즐 모드 (Puzzle)
https://api.chess.com/pub/puzzle/random 에서 퍼즐 데이터를 실시간 불러옴

PGN을 파싱하여 정답 수순과 변화 수(variation) 를 분리

사용자가 맞는 수를 두면 다음 수가 자동 진행됨

틀릴 경우 알림 제공, 정답 수 자동 체크 기능 포함

✅ 3. 승격(프로모션) UX 지원
사용자가 마지막 랭크에 폰을 도달시키면 모달이 표시되어 퀸, 룩, 비숍, 나이트 중 선택 가능

Bootstrap 5 기반의 모달 UI로 직관적이고 모바일 친화적

✅ 4. 랜덤 체스 자동 플레이 (AI Demo)
aiBoard는 자동으로 무작위 수를 두며 데모처럼 체스가 진행됨

💡 기술 스택
영역 기술
프론트엔드 HTML, CSS, JavaScript, jQuery, Bootstrap
체스 로직 chess.js
보드 렌더링 @chrisoakman/chessboardjs
AI 계산 chess-api.com
퍼즐 데이터 chess.com Puzzle API
🗂 프로젝트 구조
cpp
복사
편집
/src
├── index.js // 초기화 및 보드/퍼즐 설정
├── ui.js // 버튼 및 사용자 인터페이스 이벤트 처리
├── board.js // 체스판 생성 및 움직임 로직
├── game.js // 체스 게임 상태 관리
├── api.js // 외부 API (AI, 퍼즐) 통신 및 PGN 파서
index.html // 전체 UI 구성 및 모달 포함
🖼️ 주요 화면 구성
myBoard: 사용자 vs AI 대국

puzzleBoard: 실시간 퍼즐 풀이

aiBoard: 자동 플레이 데모 보드

모달: 프로모션 기물 선택 (♕ ♖ ♗ ♘)
