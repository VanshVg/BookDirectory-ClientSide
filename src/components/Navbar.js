import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../style/navbar.css";
import axios from "axios";
import LocalLibraryRoundedIcon from "@mui/icons-material/LocalLibraryRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import AppRegistrationRoundedIcon from "@mui/icons-material/AppRegistrationRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import { setIsLoggedIn, setUserType } from "../redux/actions/authActions";

export const Navbar = () => {
  const userType = useSelector((state) => state.auth.userType);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    const storedUserType = localStorage.getItem("userType");

    if (storedLoginStatus === "true") {
      dispatch(setIsLoggedIn(true));
    } else {
      dispatch(setIsLoggedIn(false));
    }

    if (storedUserType) {
      dispatch(setUserType(storedUserType));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("userType", userType);
  }, [userType]);

  const handleLogout = () => {
    axios
      .post("https://book-directory-api-tkvh.onrender.com/api/logout")
      .then((resp) => {
        dispatch(setIsLoggedIn(false));
        dispatch(setUserType("customer"));
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userToken");
        console.log(resp);
        navigate("/books");
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchValue}`);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark my-custom-navbar">
        <div className="container-fluid">
          <Link className="navbar-brand brand-style" to="/books">
            <img
              src="../logo512.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />{" "}
            Book Directory
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active text-link"
                  aria-current="page"
                  to="/books"
                >
                  <LocalLibraryRoundedIcon className="icon-style" />
                  Books
                </Link>
              </li>
              <li className="nav-item">
                {userType === "customer" ? (
                  <Link
                    className="nav-link active text-link"
                    aria-current="page"
                    to="/cart"
                  >
                    <ShoppingCartRoundedIcon className="icon-style" />
                    Cart
                  </Link>
                ) : (
                  <Link
                    className="nav-link active text-link"
                    aria-current="page"
                    to="/users"
                  >
                    <PeopleAltRoundedIcon className="icon-style" />
                    Users
                  </Link>
                )}
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-link"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <ManageAccountsRoundedIcon className="icon-style" />
                  {isLoggedIn ? "Account" : "Account"}
                </a>
                <ul className="dropdown-menu">
                  {isLoggedIn ? (
                    <>
                      <li>
                        <Link className="dropdown-item" to="/profile">
                          <AccountCircleRoundedIcon className="icon-style" />
                          Profile
                        </Link>
                      </li>
                      <li></li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to=""
                          onClick={handleLogout}
                        >
                          <LogoutRoundedIcon className="icon-style" />
                          Logout
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/aboutme">
                          <InfoRoundedIcon className="icon-style" />
                          About me
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link className="dropdown-item" to="/login">
                          <LoginRoundedIcon className="icon-style" />
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/register">
                          <AppRegistrationRoundedIcon className="icon-style" />
                          Register
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/aboutme">
                          <InfoRoundedIcon className="icon-style" />
                          About me
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </li>
            </ul>
            <div className="ms-2"></div>
            <form className="d-flex" role="search" onSubmit={handleSearch}>
              <input
                className="form-control me-2 custom-search-input border-white "
                type="search"
                placeholder="Search Books"
                aria-label="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button
                className="btn btn-outline-success custom-search"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};
