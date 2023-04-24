import React from 'react';
import ImagePreview from '../ImagePreview';
import ImageCard from '../ImageCard';
import "./ArtShowCaseCard.css";
import { Link } from 'react-router-dom';

const ArtShowCaseCard = ({ item }) => {

  return (
    <Link to={`/artworks/${item.id}`} className='showcard-wrapper'>
      <div className='showcard-container'>
        <ImagePreview
          imgSrc={item.image}
          imgWrapperStyle={"img--artwork-preview"}
        />
        <ImageCard
          headline={item.artist_name}
          h1text={`${item.title}, ${item.year}`}
          h2text={`${item.height} in. x ${item.width} in.`}
          cardClass={'image-card'}
        >
          <div>{item.materials}</div>
        </ImageCard>
      </div>
    </Link>
  )
};

export default ArtShowCaseCard;
