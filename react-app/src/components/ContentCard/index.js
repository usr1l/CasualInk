import React from 'react';
import Button from '../Button';
import './ContentCard.css'

const ContentCard = ({
  headline,
  h1text,
  h2text,
  buttonText,
  buttonId
}) => {
  return (
    <div className='content-card'>
      <div>{headline}</div>
      <h1>{h1text}</h1>
      <h2>{h2text}</h2>
      <Button
        buttonId={buttonId}
        buttonSize={'btn--splash'}
        buttonStyle={'btn--login'}
      >{buttonText}
      </Button>
    </div>
  )
};

export default ContentCard;
