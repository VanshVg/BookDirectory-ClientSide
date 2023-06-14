import { SET_BOOK_DATA, REMOVE_BOOK } from "../actions/types";

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
    case REMOVE_BOOK:
      const updatedBookData = state.bookData.filter(
        (book) => book.bookId !== action.payload
      );
      return {
        ...state,
        bookData: updatedBookData,
      };
    default:
      return state;
  }
};

export default bookReducer;
