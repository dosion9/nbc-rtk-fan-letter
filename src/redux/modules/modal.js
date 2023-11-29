const UPDATE_MODAL = "modal/UPDATE_MODAL";
const OPEN_MODAL = "modal/OPEN_MODAL";
const CLOSE_MODAL = "modal/CLOSE_MODAL";

export const updateModal = (payload) => {
  return {
    type: UPDATE_MODAL,
    payload
  };
};

export const openModal = (payload) => {
  return {
    type: OPEN_MODAL,
    payload
  };
};

export const closeModal = (payload) => {
  return {
    type: CLOSE_MODAL,
    payload
  };
};

const initialState = {
  type: "default",
  active: false,
  content: null,
  onSummit: null
};

const modalState = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MODAL:
      return { ...initialState, ...action.payload };
    case OPEN_MODAL:
      return { ...state, active: true };
    case CLOSE_MODAL:
      return { ...state, active: false };
    default:
      return state;
  }
};

export default modalState;
