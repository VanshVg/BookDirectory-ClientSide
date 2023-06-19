import React, { useState } from "react";
import { Navbar } from "./Navbar";
import axios from "axios";
import { useFormik } from "formik";
import { passwordSchema } from "../schema/Passwordschema";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Changepassword = () => {
  const storedToken = localStorage.getItem("userToken");
  const tokenPayload = JSON.parse(atob(storedToken.split(".")[1]));
  const userId = tokenPayload.data.userId;
  const data = {
    newpassword: "",
  };

  const [loginError, setLoginError] = useState(null);

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: data,
      validationSchema: passwordSchema,
      onSubmit: (values, action) => {
        console.log(values);
        axios
          .put(
            "https://book-directory-api-tkvh.onrender.com/api/changepassword",
            values,
            {
              params: { userId: userId },
            }
          )
          .then((resp) => {
            if (resp.status === 200) {
              toast.success("Password changed successfully", {
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
            }
          })
          .catch((err) => {
            if (err.response.status !== 200) {
              setLoginError("Server Error. Please try again.");
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
      <div className="login-container">
        <h1 className="login-heading" align="center">
          Change Password
        </h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="exampleInputEmail1" className="label">
              New Password:
            </label>
            <input
              type="password"
              className="form-control input"
              id="newpassword"
              aria-describedby="newpassword"
              name="newpassword"
              value={values.newpassword}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            {errors.newpassword && touched.newpassword ? (
              <p style={{ color: "red" }}>{errors.newpassword}</p>
            ) : null}
          </div>

          <div className="formGroup">
            <label htmlFor="password" className="label">
              Confirm New Password:
            </label>
            <input
              type="password"
              className="form-control input"
              id="confirmpassword"
              name="confirmpassword"
              value={values.confirmpassword}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            {errors.confirmpassword && touched.confirmpassword ? (
              <p style={{ color: "red" }}>{errors.confirmpassword}</p>
            ) : null}
          </div>

          {loginError && (
            <p className="error-message" style={{ color: "red" }}>
              {loginError}
            </p>
          )}

          <button type="submit" className="btn btn-primary submitButton">
            Change Password
          </button>
          <ToastContainer />
        </form>
      </div>
    </>
  );
};
