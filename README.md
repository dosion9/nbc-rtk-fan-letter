# 그룹 아티스트 팬레터함

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 프로젝트

### 로그인 페이지

![login](https://github.com/dosion9/nbc-rtk-fan-letter/assets/146798554/1a1c3978-7381-45a1-9161-e2753a18355d)

### 홈 페이지

![nbc-rtk-fan-letter vercel app_](https://github.com/dosion9/nbc-rtk-fan-letter/assets/146798554/30c58545-7838-4e26-b3dc-650313004ca5)

[팬레터함 이동하기](https://nbc-rtk-fan-letter.vercel.app/)

## 기술 스택 및 사용 라이브러리

- React
- Redux
- Redux Tool Kit
- React Router Dom
- Styled Components
- Uuid
- Json Server

## Json Server

- [glitch](https://glitch.com/) 사용하여 json server 배포
- [json-server-template](https://github.com/jesperorb/json-server-heroku)
- [레퍼지토리](https://github.com/dosion9/nbc-rtk-fan-letter-json-server)

## 프로젝트 설치

### clone repository

```
git init
git clone https://github.com/dosion9/nbc-rtk-fan-letter
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
 ┣ 📂 hooks
 ┣ 📂 pages
 ┃ ┣ 📂 Auth
 ┃ ┃ ┣ 📂 Login
 ┃ ┃ ┗ 📂 Register
 ┃ ┣ 📂 Detail
 ┃ ┣ 📂 Home
 ┃ ┗ 📂 Profile
 ┣ 📂 redux
 ┃ ┣ 📂 config
 ┃ ┗ 📂 modules
 ┣ 📂 routers
 ┣ 📂 style
 ┣ 📂 utils
 ┣ 📜 App.jsx
 ┣ 📜 App.test.jsx
 ┗ 📜 index.jsx
```

## 요구사항

### 필수 구현 사항

- ✔️ 팬레터 CRUD 를 위한 API 통신은 json-server 사용
- ✔️ 인증과 프로필관리를 위한 API 통신은 제공된 jwt인증서버를 이용
- ✔️ fetch API 대신 axios 를 이용
- ✔️ 전역 스타일에 reset.css 를 적용해주고 box-sizing이 border-box가 되도록 설정
- ✔️ Redux 사용 시 반드시 Redux Toolkit 을 이용

#### 홈 화면 UI 구현 (Create, Read)

- ✔️ 본인이 제출한 숙련과제 코드에 이어서 진행
- ✔️ 팬레터 추가폼에서 닉네임 입력값이 아닌 회원가입 시 또는 프로필관리 시 적용한 닉네임 적용

#### 상세 화면 UI 구현 (Read, Update, Delete)

- ✔️ 본인이 제출한 숙련과제 코드에 이어서 진행
- ✔️ 본인이 작성한 팬레터에서만 수정, 삭제 가능

#### 로그인/회원가입 UI 구현

- ✔️ 로그인 해야만 팬레터 화면으로 진입 가능

#### 프로필관리 UI 구현

- ✔️ 프로필 이미지, 닉네임 변경 기능 구현

### 선택 구현 사항

#### react-query

- ❌ redux-thunk 를 이용한 API 통신 로직을 react-query 로 리팩터링

#### Custom Hook

- ❌ 함수 컴포넌트 내에서 복잡한 상태변경 로직을 가지고 있거나 관리해야 할 상태 개수가 많다면 커스텀훅에서 대신 처리

#### 모달 구현

- ✔️ window.alert 이나 window.conform 대신 직접 구현한 모달을 적용

#### 새로고침 로그인 유지

- ✔️ 로컬스토리지를 이용

#### 검색 기능

- ❌ query string을 적용
- ❌ react-router-dom의 useSearchParams를 이용
- ❌ 별도의 검색버튼없이 실시간 검색구현을 한다면 deboucing 을 적용

#### 댓글 기능

- ❌ 팬레터 상세화면에 댓글 기능 구현
