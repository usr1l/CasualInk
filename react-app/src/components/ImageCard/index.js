import React from 'react';
import './ImageCard.css';

const ImageCard = ({
  headline,
  h1text,
  h2text,
  children
}) => {
  return (
    <div className='image-card'>
      <div>{headline}</div>
      <h1>{h1text}</h1>
      <h2>{h2text}</h2>
      {children}
    </div>
  )
};

export default ImageCard;
