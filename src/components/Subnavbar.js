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
          class="collapse navbar-collapse justify-content-center"
          id="navbarNavAltMarkup"
        >
          <div class="navbar-nav ">
            <Link
              class="nav-link active custom-text"
              aria-current="page"
              href="#"
            >
              Thriler
            </Link>
            <Link class="nav-link active custom-text" href="#">
              Action
            </Link>
            <Link class="nav-link active custom-text" href="#">
              Rom-Com
            </Link>
            <Link class="nav-link active custom-text">Psychologically</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
