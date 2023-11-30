import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "default",
  active: false,
  content: null,
  onSummit: null
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    updateModal: (state, action) => {
      return { ...initialState, ...action.payload };
    },
    openModal: (state, action) => {
      return { ...state, active: true };
    },
    closeModal: (state, action) => {
      return { ...state, active: false };
    }
  }
});

export default modalSlice.reducer;
export const { updateModal, openModal, closeModal } = modalSlice.actions;
