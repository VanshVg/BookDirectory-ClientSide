import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/register.css";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/authActions";
import { Navbar } from "./Navbar";
import { useFormik } from "formik";
import { registerSchema } from "../schema/Registerschema";

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
  const dispatch = useDispatch();

  const [registerError, setRegisterError] = useState(null);

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: data,
      validationSchema: registerSchema,
      onSubmit: (values, action) => {
        axios
          .post(
            "https://book-directory-api-tkvh.onrender.com/api/register",
            values
          )
          .then((resp) => {
            if (resp.data.isLoggedIn) {
              const { role, userToken } = resp.data;
              dispatch(login(true, role, userToken));
              localStorage.setItem("isLoggedIn", true);
              localStorage.setItem("userType", role);
              localStorage.setItem("userToken", userToken);
            }

            if (resp.status === 200) {
              navigate("/books");
              action.resetForm();
            }
          })
          .catch((err) => {
            console.log(err.response.status);
            if (err.response.status === 400) {
              setRegisterError("This Email is already taken");
            }
          });
      },
    });

  const handleInputChange = (e) => {
    handleChange(e);
  };

  return (
    <>
      <Navbar />
      <div className="register-container">
        <h1 className="register-heading" align="center">
          Register
        </h1>
        <form className="form" onSubmit={handleSubmit}>
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
              value={values.firstname}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            {errors.firstname && touched.firstname ? (
              <p style={{ color: "red" }}>{errors.firstname}</p>
            ) : null}
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
              value={values.lastname}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            {errors.lastname && touched.lastname ? (
              <p style={{ color: "red" }}>{errors.lastname}</p>
            ) : null}
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
              value={values.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email ? (
              <p style={{ color: "red" }}>{errors.email}</p>
            ) : null}
            {registerError && (
              <p className="error-message" style={{ color: "red" }}>
                {registerError}
              </p>
            )}
          </div>
          <div className="formGroup">
            <label htmlFor="role" className="label">
              Select Role
            </label>
            <select
              className="form-select input custom-input"
              aria-label="Default select example"
              name="role"
              value={values.role}
              onChange={handleInputChange}
              onBlur={handleBlur}
            >
              <option selected>Role</option>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && touched.role ? (
              <p style={{ color: "red" }}>{errors.role}</p>
            ) : null}
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
              value={values.password}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password ? (
              <p style={{ color: "red" }}>{errors.password}</p>
            ) : null}
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
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            {errors.confirmpassword && touched.confirmpassword ? (
              <p style={{ color: "red" }}>{errors.confirmpassword}</p>
            ) : null}
          </div>
          <button type="submit" className="btn btn-primary submitButton">
            Register
          </button>
        </form>
        <p>
          Already a user?
          <Link to="/login">Login</Link>
        </p>
      </div>
    </>
  );
};
