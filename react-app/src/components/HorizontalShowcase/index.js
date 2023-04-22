import React from 'react';
import ArtShowCaseCard from '../ArtShowCaseCard';
import "./HorizontalShowcase.css";

const HorizontalShowcase = ({ items }) => {
  return (
    <div className='horizontal-scroll-container'>
      <div>Featured Artworks</div>
      <div className='scroll-container'>
        {items.map(item => (
          <ArtShowCaseCard />
        ))}
      </div>
    </div>
  )
};

export default HorizontalShowcase;
