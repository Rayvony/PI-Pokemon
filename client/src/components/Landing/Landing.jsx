import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Landing.css";

function Landing() {
  return (
    <div className="containerLanding">
      <button className="buttonLanding">
        <NavLink className={"NavLink"} to="/home">
          Ingresar
        </NavLink>
      </button>
    </div>
  );
}

export default Landing;
