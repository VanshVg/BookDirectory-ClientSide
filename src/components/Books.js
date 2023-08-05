import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "../style/books.css";
import { Subnavbar } from "./Subnavbar";
import { Link, useNavigate } from "react-router-dom";
import { setBookData } from "../redux/actions/bookActions.js";
import { Navbar } from "./Navbar";

export const Books = () => {
  const bookData = useSelector((state) => state.book.bookData);
  const userType = useSelector((state) => state.auth.userType);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;

  useEffect(() => {
    dispatch(setBookData([]));
    axios.get("http://localhost:4000/api/showbooks").then((resp) => {
      dispatch(setBookData(resp.data.data));
    });
  }, [dispatch]);

  if (!Array.isArray(bookData)) {
    return <p>Loading...</p>;
  }

  const handleAddBook = () => {
    navigate("/books/addbook");
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = bookData.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(bookData.length / booksPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Navbar />
      <Subnavbar />
      <div className="parent-container">
        <h1 className="custom-header" align="center">
          Books
        </h1>
        <div className="horizontal-line"></div>
        <div className="books-container">
          <div className="books">
            {currentBooks.map((book, index) => (
              <div className="book" key={index}>
                <Link to={`/book/${book.bookId}`}>
                  <img src={book.imageUrl} alt={book.title} />
                  <p className="book-title">{book.title}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link pagination-button"
              onClick={() => handlePageChange(currentPage - 1)}
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <li
                className={`page-item ${currentPage === page ? "active" : ""}`}
                key={page}
              >
                <button
                  className="page-link pagination-button"
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              </li>
            )
          )}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link pagination-button"
              onClick={() => handlePageChange(currentPage + 1)}
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
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
