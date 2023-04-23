import React from 'react';
import './ContentCard.css'

const ContentCard = ({
  headline,
  h1text,
  h2text,
  children
}) => {
  return (
    <div className='content-card'>
      <div>{headline}</div>
      <h1>{h1text}</h1>
      <h2>{h2text}</h2>
      {children}
    </div>
  )
};

export default ContentCard;
