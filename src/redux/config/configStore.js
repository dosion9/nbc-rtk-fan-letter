import { configureStore } from "@reduxjs/toolkit";
import letterSlice from "redux/modules/letterSlice";
import modalSlice from "redux/modules/modalSlice";
import authSlice from "redux/modules/authSlice";

const store = configureStore({
  reducer: {
    letterSlice,
    modalSlice,
    authSlice
  }
});

export default store;
