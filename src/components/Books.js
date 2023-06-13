import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "../style/books.css";
import { Subnavbar } from "./Subnavbar";
import { Link, useNavigate } from "react-router-dom";
import { setBookData } from "../redux/actions/bookActions.js";

export const Books = () => {
  const bookData = useSelector((state) => state.book.bookData);
  const userType = useSelector((state) => state.auth.userType);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:4000/api/showbooks").then((resp) => {
      dispatch(setBookData(resp.data.data));
    });
  }, [dispatch]);

  const handleAddBook = () => {
    navigate("/books/addbook");
  };

  return (
    <>
      <Subnavbar />
      <div className="parent-container">
        <h1 className="custom-header" align="center">
          Books
        </h1>
        <div className="horizontal-line"></div>
        <div className="books-container">
          <div className="books">
            {bookData.map((book, index) => (
              <div className="book" key={index}>
                <Link to={`/book/${book.bookId}`}>
                  <img src={book.imageUrl} alt={book.title} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      {userType === "admin" && (
        <div align="center">
          <button
            type="button"
            className="btn btn-primary custom-button"
            onClick={handleAddBook}
          >
            Add a Book
          </button>
        </div>
      )}
    </>
  );
};
