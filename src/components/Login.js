import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/login.css";
import axios from "axios";
import { Authcontext } from "./Authcontext";
import { useContext } from "react";
import { useFormik } from "formik";
import { loginSchema } from "../schema/Loginschema";

export const Login = () => {
  const data = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  const { setIsLoggedIn, setUserType, setUserToken, auth } =
    useContext(Authcontext);

  const [inputData, setInputData] = useState(data);

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: data,
      validationSchema: loginSchema,
      onSubmit: (values, action) => {
        axios
          .post("http://localhost:4000/api/login", inputData)
          .then((resp) => {
            if (resp.data.isLoggedIn) {
              setIsLoggedIn(true);
              setUserType(resp.data.role);
              setUserToken(resp.data.userToken);
              localStorage.setItem("isLoggedIn", true);
              localStorage.setItem("userType", resp.data.role);
              localStorage.setItem("userToken", resp.data.userToken);
            }
            console.log(resp);
          });
        setInputData(data);
        navigate("/books");
        action.resetForm();
        auth.login();
      },
    });
  const handleInputChange = (e) => {
    handleChange(e);
    setInputData({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-container">
      <h1 className="login-heading" align="center">
        Login
      </h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="exampleInputEmail1" className="label">
            Email address
          </label>
          <input
            type="email"
            className="form-control input"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email ? (
            <p style={{ color: "red" }}>{errors.email}</p>
          ) : null}
        </div>

        <div className="formGroup">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            className="form-control input"
            id="password"
            name="password"
            value={values.password}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          {errors.password && touched.password ? (
            <p style={{ color: "red" }}>{errors.password}</p>
          ) : null}
        </div>

        <button type="submit" className="btn btn-primary submitButton">
          Login
        </button>
      </form>
      <p>
        New User?
        <Link to="/register">Create an Account</Link>
      </p>
    </div>
  );
};
