import React from 'react';
import './ImageCard.css';

const ImageCard = ({
  cardClass,
  headline,
  h1text,
  h2text,
  children
}) => {
  return (
    <div className={cardClass ? cardClass : 'image-card'}>
      <h1>{headline}</h1>
      <h2>{h1text}</h2>
      <div>{h2text}</div>
      {children}
    </div>
  )
};

export default ImageCard;
