import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBookData } from "../redux/actions/bookActions";
import { useNavigate, useParams } from "react-router-dom";
import "../style/paymentresult.css";

export const Paymentsuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const bookData = useSelector((state) => state.book.bookData);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/showbook/${id}`).then((resp) => {
      dispatch(setBookData(resp.data.book));
    });
  }, [dispatch]);

  const handleButton = () => {
    navigate("/books");
  };

  return (
    <div align="center">
      <h1>Thanx for buying {bookData.title} book</h1>
      <button type="submit" className="custom-button" onClick={handleButton}>
        Continue Shopping
      </button>
    </div>
  );
};
