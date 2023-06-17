import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setBookData } from "../redux/actions/bookActions.js";
import StripeCheckout from "react-stripe-checkout";
import "../style/payment.css";
import { Navbar } from "./Navbar";

export const Payment = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookData = useSelector((state) => state.book.bookData);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/showbook/${id}`).then((resp) => {
      dispatch(setBookData(resp.data.book));
    });
  }, [dispatch]);

  const handleToken = async (token, addresses) => {
    const resp = await axios.post("http://localhost:4000/api/processpayment", {
      token,
      bookData,
    });
    if (resp.status == 200) {
      navigate(`/paymentSuccess/${id}`);
    } else {
      navigate(`/paymentFailure/${id}`);
    }
  };

  return (
    <>
      <Navbar />
      <h1 className="text-center">Payment Checkout</h1>
      <div>
        <h3>Title: {bookData.title}</h3>
        <h4>Price: {bookData.price}₹</h4>
      </div>
      <div className="form-group-container">
        <StripeCheckout
          className="pay-button"
          stripeKey="pk_test_51NIkzbSFr8pJHijfwE9gdRJQz4wwcJv0JZ5OXjm7LXdOToy1B3DsAPcISyiFXujyxsG6mAahxdkXTa8N2ngDEJ5r00tdq5Qwmq"
          token={handleToken}
          currency="INR"
          locale="en"
          amount={bookData.price * 100}
          name={bookData.title}
          billingAddress
          shippingAddress
        />
      </div>
    </>
  );
};
