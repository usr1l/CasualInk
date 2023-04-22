import React from 'react';
import ArtShowCaseCard from '../ArtShowCaseCard';
import "./HorizontalShowcase.css";

const HorizontalShowcase = ({ items }) => {
  return (
    <div className='horizontal-scroll-container'>
      <h1 className='horizontal-scroll-header'>Featured Artworks</h1>
      <div className='scroll-container'>
        {items.map(item => (
          <ArtShowCaseCard item={item} />
        ))}
      </div>
    </div>
  )
};

export default HorizontalShowcase;
