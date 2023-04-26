import React from 'react';
import "./NavBar.css";

const NavBar = ({ children }) => {
  return (
    <div className="navbar-wrapper">
      <div className="navbar-container">
        {children}
      </div>
    </div>
  )
};

export default NavBar
