import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  content: {
    type: "default",
    content: null,
    onSummit: null
  }
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    updateModalContent: (state, action) => {
      const { type = "default", content, onSummit = null } = action.payload;

      state.isOpen = true;
      state.content = { type, content, onSummit };
    },
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    }
  }
});

export default modalSlice.reducer;
export const { updateModalContent, openModal, closeModal } = modalSlice.actions;
