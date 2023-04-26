import React from 'react';
import "./SingleFullPageDiv.css";

const SingleFullPageDiv = ({
  children,
  containerClass
}) => {
  return (
    <div className={`page-container ${containerClass}`}>
      {children}
    </div>
  )
};

export default SingleFullPageDiv;
