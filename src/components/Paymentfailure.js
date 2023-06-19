import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBookData } from "../redux/actions/bookActions";
import { useNavigate, useParams } from "react-router-dom";
import "../style/paymentresult.css";

export const Paymentfailure = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const bookData = useSelector((state) => state.book.bookData);

  useEffect(() => {
    axios
      .get(`https://book-directory-api-tkvh.onrender.com/api/showbook/${id}`)
      .then((resp) => {
        dispatch(setBookData(resp.data.book));
      });
  }, [dispatch]);

  const handleButton = () => {
    navigate(`/processPayment/${id}`);
  };

  return (
    <div align="center">
      <h1>Oops! Payment Failed!</h1>
      <button type="submit" className="custom-button" onClick={handleButton}>
        Please Try Again
      </button>
    </div>
  );
};
