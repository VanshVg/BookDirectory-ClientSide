import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/register.css";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { Authcontext } from "./Authcontext";

const data = {
  firstname: "",
  lastname: "",
  email: "",
  role: "",
  password: "",
  userId: "",
};

export const Register = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, setUserType, setUserToken } = useContext(Authcontext);

  const [inputData, setInputData] = useState(data);

  const handleData = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:4000/api/register", inputData).then((resp) => {
      if (resp.data.isLoggedIn) {
        setIsLoggedIn(true);
        setUserType(resp.data.role);
        setUserToken(resp.data.userToken);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userType", resp.data.role);
        localStorage.setItem("userToken", resp.data.userToken);
      }
    });
    setInputData(data);
    navigate("/books");
  };

  return (
    <div className="register-container">
      <h1 className="register-heading" align="center">
        Register
      </h1>
      <form className="form">
        <div className="formGroup">
          <label htmlFor="fname" className="label">
            First Name
          </label>
          <input
            type="text"
            className="custom-input form-control input"
            id="fname"
            aria-describedby="firstname"
            name="firstname"
            onChange={handleData}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="lname" className="label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control input custom-input"
            id="lname"
            aria-describedby="lastname"
            name="lastname"
            onChange={handleData}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="exampleInputEmail1" className="label">
            Email address
          </label>
          <input
            type="email"
            className="form-control input custom-input"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            onChange={handleData}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="role" className="label">
            Select Role
          </label>
          <select
            className="form-select input custom-input"
            aria-label="Default select example"
            name="role"
            onChange={handleData}
          >
            <option selected>Role</option>
            <option value="customer">Customer</option>
            <option value="seller">Seller</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="horizontalLine" />
        <div className="formGroup">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            className="form-control input custom-input"
            id="password"
            name="password"
            onChange={handleData}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="confirmPassword" className="label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control input custom-input"
            id="confirmPassword"
            name="confirmpassword"
            onChange={handleData}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary submitButton"
          onClick={handleSubmit}
        >
          Register
        </button>
      </form>
      <p>
        Already a user?
        <Link to="/login">Login</Link>
      </p>
    </div>
  );
};
