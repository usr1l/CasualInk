import React from 'react';
import "./DisplayArtSection.css";

const DisplayArtSection = ({ items }) => {
  return (
    <div className='card-display-section'>
      {items.map(item => (
        <div>{item.title}</div>
      ))}
    </div>
  )
};

export default DisplayArtSection;
