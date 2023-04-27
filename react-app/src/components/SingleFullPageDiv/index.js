import React from 'react';
import "./SingleFullPageDiv.css";

const SingleFullPageDiv = ({
  children,
  containerClass,
  id
}) => {
  return (
    <div id={id} className={`page-container ${containerClass}`}>
      {children}
    </div>
  )
};

export default SingleFullPageDiv;
