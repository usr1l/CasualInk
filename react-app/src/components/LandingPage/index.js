import React from 'react';
import { useSelector } from 'react-redux';
import HorizontalShowcase from '../HorizontalShowcase';
import FeatureBanner from '../FeatureBanner';
import "./LandingPage.css";

const LandingPage = () => {
  const { allArtworks } = useSelector(state => state.artworks);
  const { allArtlistings } = useSelector(state => state.artlistings);
  const artworks = Object.values(allArtworks)

  return (
    <div id="landing-page-container">
      <FeatureBanner />
      <HorizontalShowcase items={artworks} />
      {/* <HorizontalShowcase items={artworks} /> */}
    </div>
  )
};

export default LandingPage;
