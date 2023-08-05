import React, { useState, useEffect } from "react";
import "../style/cart.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  const storedToken = localStorage.getItem("userToken");

  useEffect(() => {
    if (storedToken) {
      const tokenPayload = JSON.parse(atob(storedToken.split(".")[1]));
      const userId = tokenPayload.data.userId;
      axios
        .get("http://localhost:4000/api/cartbooks", {
          params: { userId: userId },
        })
        .then((resp) => {
          setCartData(resp.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      navigate("/login");
    }
  }, []);

  const handleAddQuantity = (bookId) => {
    const tokenPayload = JSON.parse(atob(storedToken.split(".")[1]));
    const userId = tokenPayload.data.userId;
    axios
      .put(`http://localhost:4000/api/addquantity/${bookId}`, {
        params: { userId: userId },
      })
      .then(() => {
        setCartData((prevCartData) =>
          prevCartData.map((book) =>
            book.bookId === bookId
              ? { ...book, quantity: book.quantity + 1 }
              : book
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemoveQuantity = (bookId, quantity) => {
    const tokenPayload = JSON.parse(atob(storedToken.split(".")[1]));
    const userId = tokenPayload.data.userId;
    if (quantity > 1) {
      axios
        .put(`http://localhost:4000/api/removequantity/${bookId}`, {
          params: { userId: userId },
        })
        .then(() => {
          setCartData((prevCartData) =>
            prevCartData.map((book) =>
              book.bookId === bookId
                ? { ...book, quantity: book.quantity - 1 }
                : book
            )
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleRemoveCart = (bookId) => {
    const tokenPayload = JSON.parse(atob(storedToken.split(".")[1]));
    const userId = tokenPayload.data.userId;
    axios
      .delete(`http://localhost:4000/api/removecart/${bookId}`, {
        params: { userId: userId },
      })
      .then((resp) => {
        console.log(resp.data);
        setCartData(cartData.filter((book) => book.bookId !== bookId));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleViewDetail = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  const handleBuyNow = (bookId, quantity) => {
    navigate(`/processPayment/${bookId}?quantity=${quantity}`);
  };

  return (
    <>
      <Navbar />
      <h1 align="center">Books Cart</h1>
      <div>
        {cartData.map((book) => (
          <div className="card mb-3 custom-card" style={{ maxWidth: "540px" }}>
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={book.imageUrl}
                  className="img-fluid rounded-start custom-image"
                  alt="..."
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title custom-title" align="center">
                    {book.title}
                  </h5>
                  <span className="quantity">Quantity</span>
                  <span className="price">Price</span>
                  <p className="card-text">
                    <AddIcon
                      className="style-icon custom-add"
                      onClick={() => {
                        handleAddQuantity(book.bookId, book.quantity);
                      }}
                    />
                    <span className="quantity-value">{book.quantity}</span>
                    <RemoveIcon
                      className="style-icon custom-remove"
                      onClick={() => {
                        handleRemoveQuantity(book.bookId, book.quantity);
                      }}
                    />
                    <span className="price-value">{book.price}₹</span>
                  </p>
                </div>
                <div align="center">
                  <button
                    type="button"
                    className="btn btn-primary custom-button"
                    onClick={() => {
                      handleViewDetail(book.bookId);
                    }}
                  >
                    View Details
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary custom-button"
                    onClick={() => handleBuyNow(book.bookId, book.quantity)}
                  >
                    Buy Now
                  </button>
                </div>
                <div align="center">
                  <button
                    type="button"
                    className="btn btn-primary custom-remove-button"
                    onClick={() => {
                      handleRemoveCart(book.bookId);
                    }}
                  >
                    Remove from cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Cart;
