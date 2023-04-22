import React from "react";
import './FeatureBanner.css'
import ImagePreview from "../ImagePreview";
import ContentCard from "../ContentCard";


const FeatureBanner = ({
  cardStyle,
  heading,
  subHeading,
  imgSrc,
  children,
}) => {

  const STYLES = [ '' ];
  const checkDivStyle = STYLES.includes(cardStyle) ? cardStyle : STYLES[ 0 ];

  return (
    <div className="banner-container" id={checkDivStyle}>
      <ImagePreview imgSrc={imgSrc} />
      <div className="banner-content">
        <ContentCard
          headline={'Featured Collections'}
          h1text={"Curator's Picks: Emerging"}
          h2text={"The best works by rising talents on Artsy, all available now."}
          buttonText={'Browse Works'}
          buttonId={'banner-button'}
        />
      </div>
    </div>
  )
}

export default FeatureBanner;
