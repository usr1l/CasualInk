import React from 'react';
import { useSelector } from 'react-redux';
import HorizontalShowcase from '../HorizontalShowcase';
import FeatureBanner from '../FeatureBanner';
import image1 from "../static/displayimage2.jpg"
import image2 from "../static/displayimage.jpg"
import Button from '../Button';
import "./LandingPage.css";

const LandingPage = () => {
  const { allArtworks } = useSelector(state => state.artworks);
  const { allArtlistings } = useSelector(state => state.artlistings);
  const artworks = Object.values(allArtworks)

  return (
    <div id="landing-page">
      <div id="landing-page-content-container">
        <FeatureBanner imgSrc={image1} />
        <div>
          <Button />
          <Button />
        </div>
        <HorizontalShowcase items={artworks} />
      </div>
    </div>
  )
};

export default LandingPage;
