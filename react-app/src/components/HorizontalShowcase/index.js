import React from 'react';
import "./HorizontalShowcase.css";

const HorizontalShowcase = ({ items }) => {
  return (
    <>
      <div>Hi2</div>
      {items.map(item => (
        <div>{item.title}</div>
      ))}
    </>
  )
};

export default HorizontalShowcase;
