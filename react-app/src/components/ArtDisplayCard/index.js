import React from 'react';
import ImagePreview from '../ImagePreview';
import ImageCard from '../ImageCard';
import "./ArtDisplayCard.css";
import { Link } from 'react-router-dom';

const ArtDisplayCard = ({
  item,
  cardWrapperClass,
  cardContainerClass,
  imgWrapperStyle,
  cardClass
}) => {

  return (
    <Link to={`/artworks/${item.id}`} className={cardWrapperClass ? cardWrapperClass : 'showcard-wrapper'}>
      <div className={cardContainerClass ? cardContainerClass : 'showcard-container'}>
        <ImagePreview
          imgSrc={item.image}
          imgWrapperStyle={imgWrapperStyle ? imgWrapperStyle : "img--artwork-preview"}
        />
        <ImageCard
          headline={item.artistName}
          h1text={`${item.title}, ${item.year}`}
          h2text={`${item.height} in. x ${item.width} in.`}
          cardClass={cardClass ? cardClass : 'image-card'}
        >
          <div>{item.materials}</div>
        </ImageCard>
      </div>
    </Link>
  )
};

export default ArtDisplayCard;
