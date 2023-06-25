import React from 'react';
import ArtDisplayCard from '../ArtDisplayCard';
import "./DisplayArtSection.css";

const DisplayArtSection = ({ items }) => {
  const numItems = Object.keys(items).length;

  return (
    <div className='card-display-page'>
      <h2>{numItems} Artworks:</h2>
      <div className='card-display-section'>
        {items.map(item => (
          <ArtDisplayCard
            cardWrapperClass={"display-card click"}
            item={item}
          />
        ))}
      </div>
      <div></div>
    </div>
  )
};

export default DisplayArtSection;
