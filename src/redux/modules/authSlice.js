import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  auth: {
    id: null,
    nickname: null
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
    },
    logout: (state, action) => {
      state = initialState;
    },
    signUp: (state, action) => {
      const { id, pw, nickname } = action.payload;
      state.auth = { id, nickname };
      state.isLogin = true;
    }
  }
});

export default authSlice.reducer;
export const { login, logout, signUp } = authSlice.actions;
