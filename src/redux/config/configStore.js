import { configureStore } from "@reduxjs/toolkit";
import letterData from "redux/modules/letters";
import modalState from "redux/modules/modal";

const store = configureStore({
  reducer: {
    letterData,
    modalState
  }
});

export default store;
