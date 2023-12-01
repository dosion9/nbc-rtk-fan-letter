import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  user: {
    accessToken: null,
    userId: null,
    nickname: null,
    avatar: null
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { accessToken, userId, success, avatar, nickname } = action.payload;

      state.isLogin = success;
      state.user = {
        accessToken,
        userId,
        nickname,
        avatar
      };

      localStorage.setItem("accessToken", accessToken);
    },
    logout: (state, action) => {
      state.isLogin = false;
      state.user = initialState.user;
    }
  }
});

export default authSlice.reducer;
export const { login, logout } = authSlice.actions;
