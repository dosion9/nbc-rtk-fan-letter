# 그룹 아티스트 팬레터함

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 프로젝트

### project

![Untitled-1](https://github.com/dosion9/Fan-Letter/assets/146798554/9047b5c0-3e7c-4cb8-85e5-48e2d506e141)

[팬레터함 이동하기](https://fan-letter-cyan.vercel.app/)

## 기술 스택 및 사용 라이브러리

- React
- Redux
- React Router Dom
- Styled Components
- Uuid

## 프로젝트 설치

### clone repository

```
git init
git clone https://github.com/dosion9/Fan-Letter.git
```

### Install npm dependencies

```
npm install
```

### Start dev-server

```
npm run start
```

## 프로젝트 구조 (Redux)

```
📦 src
 ┣ 📂 assets
 ┃ ┗ 📂 img
 ┣ 📂 components
 ┃ ┣ 📂 layout
 ┃ ┣ 📂 letter
 ┃ ┗ 📂 ui
 ┣ 📂 data
 ┣ 📂 pages
 ┃ ┣ 📂 Detail
 ┃ ┣ 📂 Home
 ┃ ┗ 📂 NotFound
 ┣ 📂 redux
 ┃ ┣ 📂 config
 ┃ ┗ 📂 modules
 ┣ 📂 shared
 ┣ 📂 style
 ┣ 📂 utils
 ┣ 📜 App.jsx
 ┣ 📜 App.test.jsx
 ┗ 📜 index.jsx
```

## 요구사항

### 필수 구현 사항

#### 팬레터 CRUD 구현 (작성, 조회, 수정, 삭제)

- ✔️ Home 페이지에서 게시물 조회 기능 구현 (Read)
- ✔️ Home 페이지에서 팬레터 등록 기능 구현 (Create)
- ✔️ Detail 페이지 구현 (Read)
- ✔️ Detail 페이지에서 팬레터 내용 수정 구현 (Update)
- ✔️ Datail 페이지에서 팬레터 삭제 구현 (Delete)

#### styled-components를 이용한 스타일링

- ✔️ (이번 과제 한정) 인라인 스타일링이나 일반 css 파일 사용 지양
- ✔️ styled-components에 props를 넘겨 조건부 스타일링 적용
- ✔️ reset.css 적용 및 box-sizing은 border-box 지정

#### uuid 라이브러리 사용

- ✔️ uuid 라이브러리를 사용해 팬레터 id 지정

### 선택 구현 사항

#### 모달 구현

- ✔️ window.alert || window.conform 대신 모달창 직접 구현

#### 만능 버튼 구현

- ✔️ 하나의 버튼 컴포넌트를 재사용 가능하도록 작성
- ✔️ props로 버튼 크기나 텍스트 등 전달

#### 로컬스토리지 이용

- ✔️ 팬레터 데이터를 로컬스토리지에 저장, 가져오기

#### 검색 기능 구형

- ❌ 팬레터 데이터를 로컬스토리지에 저장, 가져오기
