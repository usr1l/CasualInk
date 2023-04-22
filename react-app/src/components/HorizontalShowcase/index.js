import React from 'react';
import "./HorizontalShowcase.css";

const HorizontalShowcase = ({ items }) => {
  return (
    <div className='horizontal-scroll-container'>
      <div>Featured Artworks</div>
      <div className='scroll-container'>
        {items.map(item => (
          <div className='scroll-container-item'>{item.title}</div>
        ))}
      </div>
    </div>
  )
};

export default HorizontalShowcase;
