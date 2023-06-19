import React from "react";
import { Navbar } from "./Navbar";
import "../style/aboutme.css";

export const Aboutme = () => {
  return (
    <>
      <Navbar />
      <div>
        <h1 align="center" style={{ marginTop: "10px" }}>
          Vansh Gandhi
        </h1>
        <b className="about-text">Email Id:</b>
        vanshgandhi.vg10@gmail.com
        <br />
        <b className="about-text">Github:</b>
        <a
          href="https://github.com/VanshVg"
          target="_blank"
          rel="noopener noreferrer"
        >
          VanshVg
        </a>
        <br />
        <b className="about-text">Linkedin:</b>
        <a
          href="https://www.linkedin.com/in/vansh-gandhi10"
          target="_blank"
          rel="noopener noreferrer"
        >
          vansh-gandhi10
        </a>
      </div>
    </>
  );
};
