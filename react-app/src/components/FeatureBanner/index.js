import React from "react";
import './FeatureBanner.css'
import ImagePreview from "../ImagePreview";
import ContentCard from "../ContentCard";


const FeatureBanner = ({
  cardStyle,
  imgSrc,
  headline,
  h1text,
  h2text,
  buttonText,
  buttonId,
}) => {

  const STYLES = [ '' ];
  const checkDivStyle = STYLES.includes(cardStyle) ? cardStyle : STYLES[ 0 ];

  return (
    <div className="banner-container" id={checkDivStyle}>
      <ImagePreview imgSrc={imgSrc} />
      <div className="banner-content">
        <ContentCard
          headline={headline}
          h1text={h1text}
          h2text={h2text}
          buttonText={buttonText}
          buttonId={buttonId}
        />
      </div>
    </div>
  )
}

export default FeatureBanner;
