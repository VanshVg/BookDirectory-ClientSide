import { SET_BOOK_DATA } from "./types";

export const setBookData = (bookData) => {
  return {
    type: SET_BOOK_DATA,
    payload: bookData,
  };
};
