import React from 'react';
import { useSelector } from 'react-redux';
import HorizontalShowcase from '../HorizontalShowcase';

const LandingPage = () => {
  const { allArtworks } = useSelector(state => state.artworks);
  const { allArtlistings } = useSelector(state => state.artlistings);
  const artworks = Object.values(allArtworks)
  console.log(artworks)
  return (
    <>
      <div>Hi</div>
      <HorizontalShowcase items={artworks} />
      <HorizontalShowcase items={artworks} />
    </>
  )
};

export default LandingPage;
