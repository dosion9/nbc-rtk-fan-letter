import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isConfirm: false,
  isOpen: false,
  content: {
    type: "default",
    content: null,
    onConfirm: {
      func: null,
      param: null
    }
  }
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    updateModalContent: (state, action) => {
      const { type = "default", content, onConfirm = initialState.onConfirm } = action.payload;
      state.isOpen = true;
      state.content = { type, content, onConfirm };
    },
    confirmModal: (state) => {
      state.isConfirm = true;
    },
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: () => initialState
  }
});

export default modalSlice.reducer;
export const { confirmModal, updateModalContent, openModal, closeModal } = modalSlice.actions;
