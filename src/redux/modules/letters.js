import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import mockLetterData from "data/mockLetterData";
import { v4 as uuidv4 } from "uuid";
import jsonServer from "../../axios/jsonServer";
export const __createLetter = createAsyncThunk("CREATE_LETTER", async (payload, thunkAPI) => {
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
  const res = await jsonServer.post("/letters", newLetter);
  thunkAPI.dispatch(createLetter(res));
});

export const __getAllLetters = createAsyncThunk("GET_ALL_LETTERS", async (payload, thunkAPI) => {
  thunkAPI.dispatch(startLoading());
  const res = await jsonServer.get("/letters?_sort=createdAt&_order=desc");
  console.log(res);
  thunkAPI.dispatch(getAllLetters(res));
});

const initialState = {
  // letters: JSON.parse(localStorage.getItem("letter")) || mockLetterData,
  isLoading: false,
  letters: JSON.parse(localStorage.getItem("letter")) || mockLetterData,
  selectedLetters: []
};

const letterSlice = createSlice({
  name: "letter",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
      console.log("isLoading : ", state.isLoading);
    },
    getAllLetters: (state, action) => {
      state.letters = action.payload;
      state.isLoading = false;
    },
    createLetter: (state, action) => {
      state.letters = [action.payload, ...state.letters];
    },
    selectLetter: (state, action) => {
      const selectedInfo = action.payload;
      const selectedLetters = state.letters.filter((n) => n.writedTo === selectedInfo || n.id === selectedInfo);
      return { ...state, selectedLetters: [...selectedLetters] };
    },
    updateLetter: (state, action) => {
      const updatedLetters = state.letters.map((n) => (n.id === action.payload.id ? action.payload : n));
      localStorage.setItem("letter", JSON.stringify(updatedLetters));
      return { ...state, letters: [...updatedLetters] };
    },
    deleteLetter: (state, action) => {
      const deletedLetters = state.letters.filter((n) => n.id !== action.payload);
      localStorage.setItem("letter", JSON.stringify(deletedLetters));
      return { ...state, letters: [...deletedLetters] };
    }
  }
});

export default letterSlice.reducer;
export const { startLoading, getAllLetters, createLetter, selectLetter, updateLetter, deleteLetter } =
  letterSlice.actions;
