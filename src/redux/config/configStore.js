import { createStore } from "redux";
import { combineReducers } from "redux";
import letterData from "redux/modules/letters";
import modalState from "redux/modules/modal";
const rootReducer = combineReducers({
  letterData,
  modalState
});

const store = createStore(rootReducer);

export default store;
