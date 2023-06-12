import React, { useContext, useEffect, useState } from "react";
import "../style/bookdetail.css";
import { Authcontext } from "./Authcontext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Bookdetail = () => {
  const { userType } = useContext(Authcontext);
  const [bookData, setBookData] = useState({});
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:4000/api/showBook/${id}`).then((resp) => {
      setBookData(resp.data.book);
    });
  }, [id]);

  const { title, imageUrl, price, author, pages, description, genre, bookId } =
    bookData;

  const handleAddCart = () => {
    const storedToken = localStorage.getItem("userToken");
    if (storedToken) {
      const tokenPayload = JSON.parse(atob(storedToken.split(".")[1]));
      const userId = tokenPayload.data.userId;
      if (localStorage.getItem("isLoggedIn") === "true") {
        axios
          .post(`http://localhost:4000/api/addtocart/${bookId}`, { userId })
          .then((resp) => {
            console.log(resp.data.result);
          })
          .catch((err) => {
            console.log(err);
          });
        toast("Item added to cart successfully", {
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

  return (
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
            <button type="button" class="btn btn-primary custom-left-button">
              Edit Book
            </button>
            <button
              type="button"
              class="btn btn-secondary custom-right-button"
              style={{ width: "120px" }}
            >
              Delete Book
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              class="btn btn-success custom-left-button"
              onClick={handleAddCart}
            >
              Add to Cart
            </button>
            <ToastContainer />
            <button type="button" class="btn btn-primary custom-right-button">
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
          <strong>Price:</strong> {price}
        </p>
        <p>
          <strong>Pages:</strong> {pages}₹
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
  );
};

export default Bookdetail;
