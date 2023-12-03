import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import jsonServer from "../../axios/jsonServer";

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
    const res = await jsonServer.post("/letters", newLetter);
    return thunkAPI.fulfillWithValue(res.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __deleteLetter = createAsyncThunk("deleteLetter", async (payload, thunkAPI) => {
  const { id: targetId } = payload;
  try {
    const res = await jsonServer.delete(`/letters/${targetId}`);
    console.log(res);
    return thunkAPI.fulfillWithValue(res.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __getLetters = createAsyncThunk("getLetters", async (_, thunkAPI) => {
  try {
    const res = await jsonServer.get("/letters?_sort=createdAt&_order=desc");
    return thunkAPI.fulfillWithValue(res.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __updateLetter = createAsyncThunk("updateLetter", async (payload, thunkAPI) => {
  const { id: targetId, content } = payload;
  try {
    const res = await jsonServer.patch(`/letters/${targetId}`, { content: content });
    return thunkAPI.fulfillWithValue(res.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState = {
  isUpdate: false,
  isLoading: false,
  snapshot: [],
  selectedLetters: []
};

const letterSlice = createSlice({
  name: "letter",
  initialState,
  reducers: {
    selectLetter: (state, action) => {
      const selectedInfo = action.payload;
      const newSelectedLetters = state.snapshot.filter((n) => n.writedTo === selectedInfo || n.id === selectedInfo);
      state.selectedLetters = newSelectedLetters;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(__createLetter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__createLetter.fulfilled, (state, action) => {
        state.snapshot = [action.payload, ...state.snapshot];
        state.isLoading = false;
      })
      .addCase(__createLetter.rejected, (state, action) => {
        console.error("팬레터 작성 실패");
        console.error(action.payload.data);
        state.isLoading = false;
      });
    builder
      .addCase(__deleteLetter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__deleteLetter.fulfilled, (state, action) => {
        state.snapshot = state.snapshot.filter((n) => n.id !== action.payload);
        state.isLoading = false;
      })
      .addCase(__deleteLetter.rejected, (state, action) => {
        console.error("팬레터 삭제 실패");
        console.error(action.payload.data);
        state.isLoading = false;
      });
    builder
      .addCase(__getLetters.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getLetters.fulfilled, (state, action) => {
        state.snapshot = action.payload;
        state.isLoading = false;
      })
      .addCase(__getLetters.rejected, (state, action) => {
        state.isLoading = false;
        console.error("팬레터 데이터 가져오기 실패");
        console.error(action.payload.data);
      });
    builder
      .addCase(__updateLetter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__updateLetter.fulfilled, (state, action) => {
        state.snapshot = state.snapshot.map((n) => (n.id === action.payload.id ? action.payload : n));
        console.log(state.snapshot);
        state.isLoading = false;
      })
      .addCase(__updateLetter.rejected, (state, action) => {
        console.error("팬레터 수정 실패");
        console.error(action.payload.data);
        state.isLoading = false;
      });
  }
});

export default letterSlice.reducer;
export const { selectLetter } = letterSlice.actions;
