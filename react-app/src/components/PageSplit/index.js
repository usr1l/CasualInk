import React from 'react';
import "./PageSplit.css";

const PageSplit = ({
  children
}) => {
  return (
    <div className='page-split-half'>
      {children}
    </div>
  )
};

export default PageSplit;
