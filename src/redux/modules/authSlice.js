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

export const __regist = createAsyncThunk("regist", async (payload, thunkAPI) => {
  try {
    const registRes = await api.post("/register", payload);
    return thunkAPI.fulfillWithValue(registRes.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const initialState = {
  isLoading: false,
  isLogin: false,
  alert: {
    isError: false,
    msg: null
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
    logout: () => {
      localStorage.removeItem("accessToken");
      return initialState;
    },
    clearAuthAlert: (state) => {
      state.alert = initialState.alert;
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
        state.alert = { isError: true, msg: action.payload.message };
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
        state.alert = { isError: true, msg: action.payload.message };
      });
    builder
      .addCase(__updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        const { avatar, message, nickname } = action.payload;
        state.user.nickname = nickname;
        state.user.avatar = avatar;
        state.alert = { isError: false, msg: message };
      })
      .addCase(__updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.alert = { isError: true, msg: action.payload.message };
      });
    builder
      .addCase(__regist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__regist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.alert = { isError: false, msg: action.payload.message };
      })
      .addCase(__regist.rejected, (state, action) => {
        state.isLoading = false;
        state.alert = { isError: true, msg: action.payload.message };
      });
  }
});

export default authSlice.reducer;
export const { logout, clearAuthAlert } = authSlice.actions;
