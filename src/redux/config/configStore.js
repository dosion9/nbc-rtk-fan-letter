import { configureStore } from "@reduxjs/toolkit";
import letterData from "redux/modules/letters";
import modalState from "redux/modules/modal";
import authSlice from "redux/modules/authSlice";

const store = configureStore({
  reducer: {
    letterData,
    modalState,
    authSlice
  }
});

export default store;
