import React from "react";
import "../style/subnavbar.css";
import { Link } from "react-router-dom";

export const Subnavbar = () => {
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary d-flex justify-content-center custom-subnavbar">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNavAltMarkup"
        >
          <div class="navbar-nav ">
            <Link
              className="nav-link active custom-text"
              aria-current="page"
              to="/books/Thriller"
            >
              Thriller
            </Link>
            <Link className="nav-link active custom-text" to="/books/Action">
              Action
            </Link>
            <Link className="nav-link active custom-text" to="/books/Romcom">
              RomCom
            </Link>
            <Link className="nav-link active custom-text" to="/books/War">
              War
            </Link>
            <Link className="nav-link active custom-text" to="/books/Novel">
              Novel
            </Link>
            <Link className="nav-link active custom-text" to="/books/Fiction">
              Fiction
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
