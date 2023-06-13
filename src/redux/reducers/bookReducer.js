import { SET_BOOK_DATA } from "../actions/types";

const initialState = {
  bookData: [],
};

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOK_DATA:
      return {
        ...state,
        bookData: action.payload,
      };
    default:
      return state;
  }
};

export default bookReducer;
