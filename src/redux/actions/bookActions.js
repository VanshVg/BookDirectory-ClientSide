import { SET_BOOK_DATA, REMOVE_BOOK } from "./types";

export const setBookData = (bookData) => {
  return {
    type: SET_BOOK_DATA,
    payload: bookData,
  };
};

export const removeBook = (bookId) => {
  return {
    type: REMOVE_BOOK,
    payload: bookId,
  };
};
