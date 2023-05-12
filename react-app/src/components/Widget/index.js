import React from "react";
import "./Widget.css";

const Widget = ({
  label,
  component
}) => {
  return (
    <div className="widget-container">
      <div>{label}</div>
      <div>{component}</div>
    </div>
  );
};

export default Widget;
