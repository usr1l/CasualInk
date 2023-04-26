import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import HorizontalShowcase from '../HorizontalShowcase';
import FeatureBanner from '../FeatureBanner';
import image1 from "../static/displayimage2.jpg"
import image2 from "../static/display-image4.jpg"
import "./LandingPage.css";
import SingleFullPageDiv from '../SingleFullPageDiv';

const LandingPage = () => {
  const { allArtworks } = useSelector(state => state.artworks);
  const artworks = Object.values(allArtworks);

  const [ currBanner, setCurrBanner ] = useState('overlap-banner-hidden');
  const [ banner1, setBanner1 ] = useState('banner-slider focused');
  const [ banner2, setBanner2 ] = useState('banner-slider');

  const onClick = (e) => {
    const dataId = e.target.getAttribute("data-id")
    if (dataId !== currBanner) {
      if (dataId === "1") {
        setBanner1('banner-slider focused')
        setBanner2('banner-slider')
        setCurrBanner("overlap-banner-hidden");
      } else {
        setBanner1('banner-slider')
        setBanner2('banner-slider focused')
        setCurrBanner("overlap-banner");
      };
    };
  };

  useEffect(() => {
    const flipBanner = setInterval(() => {
      if (currBanner === 'overlap-banner-hidden') {
        setBanner1('banner-slider')
        setBanner2('banner-slider focused')
        setCurrBanner("overlap-banner")
      };
      if (currBanner === "overlap-banner") {
        setBanner1('banner-slider focused')
        setBanner2('banner-slider')
        setCurrBanner("overlap-banner-hidden")
      };
    }, 5000);

    return (() => {
      clearInterval(flipBanner);
    });
  });

  return (
    <SingleFullPageDiv>
      <div className="landing-page-content-container">
        <div className='feature-banner-container'>
          <FeatureBanner
            imgSrc={image1}
            headline={'Featured Artwork'}
            h1text={"Curator's Picks: Emerging"}
            h2text={"Explore works by talented and emerging artists."}
            buttonText={'Browse Works'}
            buttonId={'banner-button'}
          />
          <FeatureBanner
            // cardStyle={"absolute"}
            imgSrc={image2}
            headline={'Featured Collections'}
            h1text={"Collect, Sell, and Auction"}
            h2text={"Find works for sale and auction by both rising and established artists."}
            buttonText={'Browse Works'}
            cardStyle={currBanner}
            buttonId={'banner-button'}
          />
        </div>
        <div id='feature-banner-slider'>
          <div data-id='1' id='banner-slider1' className={banner1} onClick={onClick}></div>
          <div data-id='2' id='banner-slider2' className={banner2} onClick={onClick}></div>
        </div>
        <HorizontalShowcase items={artworks} />
      </div>
    </SingleFullPageDiv>
  )
};

export default LandingPage;
