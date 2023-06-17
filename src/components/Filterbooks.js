import axios from "axios";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBookData } from "../redux/actions/bookActions.js";
import { Link, useParams } from "react-router-dom";
import { Subnavbar } from "./Subnavbar.js";
import { Navbar } from "./Navbar";

export const Filterbooks = () => {
  const bookData = useSelector((state) => state.book.bookData);
  const dispatch = useDispatch();
  const { value } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/books/${value}`)
      .then((resp) => {
        dispatch(setBookData(resp.data.books));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [value, dispatch]);

  return (
    <>
      <Navbar />
      <Subnavbar />
      <div className="parent-container">
        <h1 className="custom-header" align="center">
          {value} Books
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
    </>
  );
};
