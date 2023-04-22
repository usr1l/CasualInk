import React from 'react';
import ImagePreview from '../ImagePreview';
import ImageCard from '../ImageCard';
import "./ArtShowCaseCard.css";

const ArtShowCaseCard = ({ item }) => {
  console.log("ITEM", item)
  return (
    <div className='scroll-container-item'>
      <div className='showcard-wrapper'>
        <div className='showcard-container'>
          <ImagePreview
            imgSrc={item.image}
          />
          <ImageCard
            headline={item.name}
            h1text={item.artist_name}
            h2text={`${item.height} X ${item.width}`}
          >
          </ImageCard>
        </div>
      </div>
    </div>
  )
};

export default ArtShowCaseCard;
