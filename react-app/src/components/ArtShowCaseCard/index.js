import React from 'react';
import ImagePreview from '../ImagePreview';
import ImageCard from '../ImageCard';
import "./ArtShowCaseCard.css";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ArtShowCaseCard = ({ item }) => {
  const currUser = useSelector(state => state.session.user)

  return (
    <>
      {item && (
        <>
          {currUser ? (
            <Link to={`/artworks/${item.id}`} className='showcard-wrapper'>
              <div className='showcard-container'>
                <ImagePreview
                  imgSrc={item.image}
                  imgWrapperStyle={"img--artwork-preview"}
                />
                <ImageCard
                  headline={item.artistName}
                  h1text={`${item.title}, ${item.year}`}
                  h2text={`${item.height} in. x ${item.width} in.`}
                  cardClass={'image-card'}
                >
                  <div>{item.materials}</div>
                </ImageCard>
              </div>
            </Link>
          ) : (
            <div to={`/artworks/${item.id}`} className='showcard-wrapper'>
              <div className='showcard-container'>
                <ImagePreview
                  imgSrc={item.image}
                  imgWrapperStyle={"img--artwork-preview"}
                />
                <ImageCard
                  headline={item.artistName}
                  h1text={`${item.title}, ${item.year}`}
                  h2text={`${item.height} in. x ${item.width} in.`}
                  cardClass={'image-card'}
                >
                  <div>{item.materials}</div>
                </ImageCard>
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
};

export default ArtShowCaseCard;
