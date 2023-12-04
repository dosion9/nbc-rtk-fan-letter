import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axios/api";

export const __tokenLogin = createAsyncThunk("tokenLogin", async (_, thunkAPI) => {
  try {
    const res = await api.get("/user");
    return thunkAPI.fulfillWithValue(res.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const __login = createAsyncThunk("login", async (payload, thunkAPI) => {
  try {
    const res = await api.post("/login", payload);
    // const res = await api.post("/login?expiresIn=10s", payload);
    return thunkAPI.fulfillWithValue(res.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const __updateProfile = createAsyncThunk("updateProfile", async (payload, thunkAPI) => {
  try {
    const res = await api.patch("/profile", payload);
    return thunkAPI.fulfillWithValue(res.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const initialState = {
  isLoading: false,
  isLogin: false,
  error: {
    isError: false,
    error: null
  },
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
    logout: () => {
      localStorage.removeItem("accessToken");
      return initialState;
    },
    clearAuthError: (state) => {
      state.error = initialState.error;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(__tokenLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__tokenLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        const { id: userId, nickname, avatar, success } = action.payload;
        if (!state.isLogin) {
          state.isLogin = success;
          state.user = { userId, nickname, avatar };
        }
      })
      .addCase(__tokenLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isLogin = false;
        state.error = { isError: true, error: action.payload.message };
        localStorage.removeItem("accessToken");
      });
    builder
      .addCase(__login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__login.fulfilled, (state, action) => {
        const { accessToken, userId, success, avatar, nickname } = action.payload;
        state.isLoading = false;
        state.isLogin = success;
        state.user = {
          accessToken,
          userId,
          nickname,
          avatar
        };

        localStorage.setItem("accessToken", accessToken);
      })
      .addCase(__login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = { isError: true, error: action.payload.message };
      });
    builder
      .addCase(__updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        const { avatar, message, nickname, success } = action.payload;
        state.error = { isError: true, error: message };
        state.user.nickname = nickname;
        state.user.avatar = avatar;

        // 인증서버에 프로필 변경 완료했을 때 json-server의 내가 작성한 팬레터 (letters)들에 nickname과 avatar를 모두 수정
      })
      .addCase(__updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = { isError: true, error: action.payload.message };
      });
  }
});

export default authSlice.reducer;
export const { login, logout, clearAuthError } = authSlice.actions;
