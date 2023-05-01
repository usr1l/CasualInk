import React from 'react';
import ArtShowCaseCard from '../ArtShowCaseCard';
import "./HorizontalShowcase.css";

const HorizontalShowcase = ({ items, caption }) => {
  return (
    <div className='horizontal-scroll-container'>
      <h1 className='horizontal-scroll-header'>{caption}</h1>
      <div className='scroll-container'>
        {items.map(item => (
          <div className='scroll-container-item'>
            <ArtShowCaseCard item={item} />
          </div>
        ))}
      </div>
    </div>
  )
};

export default HorizontalShowcase;
