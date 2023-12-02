import { configureStore } from "@reduxjs/toolkit";
import letterData from "redux/modules/letters";
import modalSlice from "redux/modules/modalSlice";
import authSlice from "redux/modules/authSlice";

const store = configureStore({
  reducer: {
    letterData,
    modalSlice,
    authSlice
  }
});

export default store;
