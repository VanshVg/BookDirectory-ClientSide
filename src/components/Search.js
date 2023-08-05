import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBookData } from "../redux/actions/bookActions";
import { Navbar } from "./Navbar";
import { Link, useLocation } from "react-router-dom";
import "../style/search.css";

export const Search = () => {
  const dispatch = useDispatch();
  const bookData = useSelector((state) => state.book.bookData);
  const title = new URLSearchParams(window.location.search).get("query");
  const location = useLocation();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/search", {
        params: { title: title },
      })
      .then((resp) => {
        dispatch(setBookData(resp.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [title]);

  useEffect(() => {
    const newTitle = new URLSearchParams(location.search).get("query");
    if (newTitle !== title) {
      axios
        .get("http://localhost:4000/api/search", {
          params: { title: newTitle },
        })
        .then((resp) => {
          dispatch(setBookData(resp.data.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [location, dispatch, title]);

  return (
    <>
      <Navbar />
      {bookData.length > 0 ? (
        <>
          <h1 align="center">Search Results</h1>
          <div className="line"></div>
          <div className="books-container">
            <div className="books">
              {bookData.map((book, index) => (
                <div className="book" key={index}>
                  <Link to={`/book/${book.bookId}`}>
                    <img src={book.imageUrl} alt={book.title} />
                    <p className="book-title">{book.title}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <h2 align="center" style={{ marginTop: "15px" }}>
            No books found
          </h2>
        </>
      )}
    </>
  );
};
