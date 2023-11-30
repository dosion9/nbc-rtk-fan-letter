import { createSlice } from "@reduxjs/toolkit";
import mockLetterData from "data/mockLetterData";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  letters: JSON.parse(localStorage.getItem("letter")) || mockLetterData,
  selectedLetters: []
};

const letterSlice = createSlice({
  name: "letter",
  initialState,
  reducers: {
    createLetter: (state, action) => {
      const { nickname, content, writedTo } = action.payload;
      const letter = {
        createdAt: new Date().toISOString(),
        nickname,
        avatar:
          "https://mblogthumb-phinf.pstatic.net/MjAyMDA2MTBfMTY1/MDAxNTkxNzQ2ODcyOTI2.Yw5WjjU3IuItPtqbegrIBJr3TSDMd_OPhQ2Nw-0-0ksg.8WgVjtB0fy0RCv0XhhUOOWt90Kz_394Zzb6xPjG6I8gg.PNG.lamute/user.png?type=w800",
        content,
        writedTo,
        id: uuidv4()
      };
      localStorage.setItem("letter", JSON.stringify([...state.letters, letter]));
      return { ...state, letters: [...state.letters, letter] };
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
export const { createLetter, selectLetter, updateLetter, deleteLetter } = letterSlice.actions;
