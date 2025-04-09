
# ♟️ ChessJS - 웹 기반 체스 게임 & 퍼즐 플레이

> 체스엔진 API와의 1:1 대전과 체스 퍼즐이 포함된 프로젝트입니다.  

---

## 🧩 주요 기능

### ✅ 1. API와 1:1 대국

- `chess.js` 엔진을 활용하여 체스 룰 기반의 게임 상태 관리
- `chess-api.com` API를 통해 다음 수 계산
- 사용자는 `Depth`, `Thinking Time(ms)`을 조절하여 난이도 조정 가능

### ✅ 2. 체스 퍼즐 모드 (Puzzle)

- `https://api.chess.com/pub/puzzle/random` 에서 퍼즐 데이터를 불러옴
- 사용자가 맞는 수를 두면 다음 수가 진행됨
- 틀릴 경우 알림 제공, 정답 수 확인 기능 포함

### ✅ 3. 승격(프로모션) 지원

- 사용자가 마지막 랭크에 폰을 도달시키면 모달이 표시되어 퀸, 룩, 비숍, 나이트 중 선택 가능

---

## 💡 스택

| 영역         | 기술 |
|--------------|------|
| 프론트엔드   | HTML, CSS, JavaScript, jQuery, Bootstrap |
| 체스 로직    | [chess.js](https://github.com/jhlywa/chess.js) |
| 보드 렌더링  | [@chrisoakman/chessboardjs](https://www.npmjs.com/package/@chrisoakman/chessboardjs) |
| 다음 수 계산      | [chess-api.com](https://chess-api.com/) |
| 퍼즐 데이터  | [chess.com Puzzle API](https://api.chess.com/pub/puzzle/random) |

---

## 🗂 프로젝트 구조

```
/src
├── index.js          // 초기화 및 보드/퍼즐 설정
├── ui.js             // 버튼 및 사용자 인터페이스 이벤트 처리
├── board.js          // 체스판 생성 및 움직임 로직
├── game.js           // 체스 게임 상태 관리
├── api.js            // 외부 API (AI, 퍼즐) 통신 및 PGN 파서
index.html            // 전체 UI 구성 및 모달 포함
```

---

## 🖼️ 주요 화면 구성

- `aiBoard`: 자동 플레이 데모 보드
  
  ![image](https://github.com/user-attachments/assets/90c5052a-606a-4936-8e6f-a9bddd45fd85)

- `myBoard`: 사용자 vs AI 대국

  ![image](https://github.com/user-attachments/assets/9cfa8c02-54b5-4987-93d2-f8354c2bb367)

- `puzzleBoard`: 실시간 퍼즐 풀이

![image](https://github.com/user-attachments/assets/33934cbb-8eec-4d80-b701-50ff92839d6f)

---
