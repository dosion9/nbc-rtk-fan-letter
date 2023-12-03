import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import jsonServer from "../../axios/jsonServer";
import { __tokenLogin } from "./authSlice";
export const __createLetter = createAsyncThunk("createLetter", async (payload, thunkAPI) => {
  const { nickname, content, writedTo, userId } = payload;
  const newLetter = {
    createdAt: new Date().toISOString(),
    nickname,
    avatar:
      "https://mblogthumb-phinf.pstatic.net/MjAyMDA2MTBfMTY1/MDAxNTkxNzQ2ODcyOTI2.Yw5WjjU3IuItPtqbegrIBJr3TSDMd_OPhQ2Nw-0-0ksg.8WgVjtB0fy0RCv0XhhUOOWt90Kz_394Zzb6xPjG6I8gg.PNG.lamute/user.png?type=w800",
    content,
    writedTo,
    id: uuidv4(),
    userId
  };
  try {
    const confirmToken = await thunkAPI.dispatch(__tokenLogin());
    if (confirmToken.type === "tokenLogin/fulfilled") {
      const res = await jsonServer.post("/letters", newLetter);
      return thunkAPI.fulfillWithValue(res.data);
    }
  } catch (error) {
    console.log("등록실패");
    return thunkAPI.rejectWithValue(error);
  }
});

export const __deleteLetter = createAsyncThunk("deleteLetter", async (payload, thunkAPI) => {
  const { id: targetId } = payload;
  try {
    const confirmToken = await thunkAPI.dispatch(__tokenLogin());
    if (confirmToken.type === "tokenLogin/fulfilled") {
      const res = await jsonServer.delete(`/letters/${targetId}`);
      return thunkAPI.fulfillWithValue(res.data);
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __getLetters = createAsyncThunk("getLetters", async (_, thunkAPI) => {
  try {
    const confirmToken = await thunkAPI.dispatch(__tokenLogin());
    if (confirmToken.type === "tokenLogin/fulfilled") {
      const res = await jsonServer.get("/letters?_sort=createdAt&_order=desc");
      console.log(res.data);
      return thunkAPI.fulfillWithValue(res.data);
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __updateLetter = createAsyncThunk("updateLetter", async (payload, thunkAPI) => {
  const { id: targetId, content } = payload;
  try {
    const confirmToken = await thunkAPI.dispatch(__tokenLogin());
    if (confirmToken.type === "tokenLogin/fulfilled") {
      const res = await jsonServer.patch(`/letters/${targetId}`, { content: content });
      return thunkAPI.fulfillWithValue(res.data);
    }
  } catch (error) {
    console.log("에러남");
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState = {
  isLoading: false,
  snapshot: [],
  selectedLetters: [],
  error: {
    isError: false,
    error: null
  }
};

const letterSlice = createSlice({
  name: "letter",
  initialState,
  reducers: {
    selectLetter: (state, action) => {
      const selectedInfo = action.payload;
      console.log(selectedInfo);
      console.log(state.selectedLetters);
      const newSelectedLetters = state.snapshot.filter((n) => n.writedTo === selectedInfo || n.id === selectedInfo);

      state.selectedLetters = newSelectedLetters;
    },
    clearLetterError: (state) => {
      state.error = initialState.error;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(__createLetter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__createLetter.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.snapshot = [action.payload, ...state.snapshot];
        }
      })
      .addCase(__createLetter.rejected, (state, action) => {
        state.isLoading = false;
        state.error = { isError: true, error: action.payload.response.data.message };
      });
    builder
      .addCase(__deleteLetter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__deleteLetter.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.snapshot = state.snapshot.filter((n) => n.id !== action.payload);
        }
      })
      .addCase(__deleteLetter.rejected, (state, action) => {
        state.isLoading = false;
        state.error = { isError: true, error: action.payload.response.data.message };
      });
    builder
      .addCase(__getLetters.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getLetters.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.snapshot = action.payload;
        }
      })
      .addCase(__getLetters.rejected, (state, action) => {
        state.isLoading = false;
        state.error = { isError: true, error: action.payload.response.data.message };
      });
    builder
      .addCase(__updateLetter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__updateLetter.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload) {
          state.snapshot = state.snapshot.map((n) => (n.id === action.payload.id ? action.payload : n));
        }
      })
      .addCase(__updateLetter.rejected, (state, action) => {
        state.isLoading = false;
        state.error = { isError: true, error: action.payload.response.data.message };
      });
  }
});

export default letterSlice.reducer;
export const { clearLetterError, selectLetter } = letterSlice.actions;
