import React from 'react';
import "./PageSplit.css";

const PageSplit = ({
  pageSplitClass,
  children
}) => {
  return (
    <div className={`page-split-half ${pageSplitClass ? pageSplitClass : ""}`}>
      {children}
    </div>
  )
};

export default PageSplit;
