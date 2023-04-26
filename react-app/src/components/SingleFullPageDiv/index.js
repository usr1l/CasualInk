import React from 'react';
import "./SingleFullPageDiv.css";

const SingleFullPageDiv = ({ children }) => {
  return (
    <div className='single-page-full'>
      {children}
    </div>
  )
};

export default SingleFullPageDiv;
