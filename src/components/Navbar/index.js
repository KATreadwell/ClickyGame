import React from "react";
import "./style.css";

function Navbar(props) {
  return <h3 className="navbar">{props.children}</h3>;
}

export default Navbar;
