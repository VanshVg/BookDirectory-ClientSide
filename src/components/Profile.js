import React, { useEffect, useState } from "react";
import "../style/profile.css";
import { Navbar } from "./Navbar";
import axios from "axios";
import { setUserData } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storedToken = localStorage.getItem("userToken");
  const tokenPayload = JSON.parse(atob(storedToken.split(".")[1]));
  const userId = tokenPayload.data.userId;

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [screenOpacity, setScreenOpacity] = useState(1);
  const [password, setPassword] = useState("");
  const [wrongPassword, setWrongPassword] = useState("");

  useEffect(() => {
    dispatch(setUserData([]));
    axios
      .get("http://localhost:4000/api/profile", {
        params: { userId: userId },
      })
      .then((resp) => {
        dispatch(setUserData(resp.data.data));
      });
  }, [dispatch]);

  const handleInputChange = (e) => {
    setPassword(e.target.value);
  };

  const handleOldPasswordButton = () => {
    axios
      .get("http://localhost:4000/api/verifypassword", {
        params: { userId: userId, password: password },
      })
      .then((resp) => {
        if (resp.status === 200) {
          navigate("/changepassword");
        }
      })
      .catch((err) => {
        if (err.response.status !== 200) {
          setWrongPassword("Invalid Password");
        }
      });
  };

  return (
    <>
      <Navbar />
      <h1 align="center" style={{ marginTop: "20px" }}>
        Profile
      </h1>
      <div className="profile-container" style={{ opacity: screenOpacity }}>
        <form className="profile-form">
          <div className="profile-form-row">
            <div className="profile-form-column">
              <label htmlFor="firstName" className="profile-label">
                First Name:
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder={userData.firstname}
                className="profile-field"
                disabled
              />
            </div>
            <div className="profile-form-column">
              <label htmlFor="email" className="profile-label">
                Email Id:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder={userData.email}
                className="profile-field"
                disabled
              />
            </div>
          </div>
          <div className="profile-form-row">
            <div className="profile-form-column">
              <label htmlFor="lastName" className="profile-label">
                Last Name:
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder={userData.lastname}
                className="profile-field"
                disabled
              />
            </div>
            <div className="profile-form-column">
              <label htmlFor="role" className="profile-label">
                Role:
              </label>
              <input
                type="text"
                id="role"
                name="role"
                placeholder={userData.role}
                className="profile-field"
                disabled
              />
            </div>
          </div>
          <div align="center">
            <div className="profile-row">
              <button
                type="button"
                className="profile-button"
                onClick={() => {
                  setShowChangePassword(true);
                  setScreenOpacity(0.1);
                }}
              >
                Change Password
              </button>
            </div>
          </div>
        </form>
      </div>
      {showChangePassword && (
        <div className="password-box">
          <button
            className="close-button"
            onClick={() => {
              setShowChangePassword(false);
              setScreenOpacity(1);
            }}
          >
            &times;
          </button>
          <label htmlFor="lastName" className="profile-label">
            Old Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter the old password"
            className="box-field"
            value={password}
            onChange={handleInputChange}
          />
          {wrongPassword && (
            <p className="error-message" style={{ color: "red" }}>
              {wrongPassword}
            </p>
          )}
          <button
            type="button"
            className="box-button"
            onClick={handleOldPasswordButton}
          >
            Enter password
          </button>
        </div>
      )}
    </>
  );
};
