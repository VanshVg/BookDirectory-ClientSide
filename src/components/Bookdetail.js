import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setCartItems } from "../redux/actions/authActions";
import "../style/bookdetail.css";
import { removeBook } from "../redux/actions/bookActions";
import { Navbar } from "./Navbar";

const Bookdetail = () => {
  const userType = useSelector((state) => state.auth.userType);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:4000/api/showBook/${id}`).then((resp) => {
      dispatch(setCartItems(resp.data.book));
    });
  }, [dispatch, id]);

  const handleAddCart = () => {
    const storedToken = localStorage.getItem("userToken");
    if (storedToken) {
      const tokenPayload = JSON.parse(atob(storedToken.split(".")[1]));
      const userId = tokenPayload.data.userId;
      if (isLoggedIn) {
        axios
          .post(`http://localhost:4000/api/addtocart/${bookId}`, { userId })
          .then((resp) => {
            console.log(resp.data.result);
          })
          .catch((err) => {
            console.log(err);
          });
        toast.success("Item added to cart successfully", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
          className: "toast-message",
        });
      } else {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  };

  const { title, imageUrl, price, author, pages, description, genre, bookId } =
    useSelector((state) => state.auth.cartItems);

  const handleEditBook = (bookId) => {
    navigate(`/editbook/${bookId}`);
  };

  const handleDeleteBook = (bookId) => {
    axios
      .delete(`http://localhost:4000/api/removebook/${bookId}`)
      .then(() => {
        dispatch(removeBook(bookId));
        navigate("/books");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBuyNow = (bookId) => {
    if (isLoggedIn === true) {
      navigate(`/processPayment/${bookId}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <Navbar />
      <div className="book-page">
        <h1 className="book-title">{title}</h1>
        <div className="line"></div>
        <div className="book-info">
          <img src={imageUrl} alt="Book Cover" className="book-image" />
        </div>
        <br></br>
        <div className="line"></div>
        <div className="buttons-container">
          {userType === "admin" ? (
            <>
              <button
                type="button"
                className="btn btn-primary custom-left-button"
                onClick={() => handleEditBook(bookId)}
              >
                Edit Book
              </button>
              <button
                type="button"
                className="btn btn-secondary custom-right-button"
                style={{ width: "120px" }}
                onClick={() => handleDeleteBook(bookId)}
              >
                Delete Book
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="btn btn-success custom-left-button"
                onClick={handleAddCart}
              >
                Add to Cart
              </button>
              <ToastContainer />
              <button
                type="button"
                className="btn btn-primary custom-right-button"
                onClick={() => handleBuyNow(bookId)}
              >
                Buy Now
              </button>
            </>
          )}
        </div>
        <div className="book-details">
          <p>
            <strong>Author:</strong> {author}
          </p>
          <p>
            <strong>Price:</strong> {price}₹
          </p>
          <p>
            <strong>Pages:</strong> {pages}
          </p>
          {genre && (
            <p>
              <strong>Genre:</strong> {genre.join(", ")}
            </p>
          )}
        </div>
        <div className="line"></div>
        <h2>Description</h2>
        <div className="book-description">
          <p>{description}</p>
        </div>
      </div>
    </>
  );
};

export default Bookdetail;
