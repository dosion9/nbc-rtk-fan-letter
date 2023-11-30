const { createSlice } = require("@reduxjs/toolkit");
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
      state.isLogin = false;
    },
    signUp: (state, action) => {
      const { id, pw, nickname } = action.payload;
      alert(`${id} ${pw} ${nickname}`);
      state.auth = { id, nickname };
      state.isLogin = true;
    }
  }
});

export default authSlice.reducer;
export const { login, logout, signUp } = authSlice.actions;
