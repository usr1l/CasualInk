import React from "react";
import ImagePreview from "../ImagePreview";
import ContentCard from "../ContentCard";
import Button from "../Button";
import './FeatureBanner.css'


const FeatureBanner = ({
  cardStyle,
  imgSrc,
  headline,
  h1text,
  h2text,
  buttonText,
  buttonId,
}) => {

  const STYLES = [ '', 'overlap-banner', 'overlap-banner-fadein', 'overlap-banner-fadeout', 'overlap-banner-hidden' ];
  const checkDivStyle = STYLES.includes(cardStyle) ? cardStyle : STYLES[ 0 ];

  return (
    <div className="banner-container" id={checkDivStyle}>
      <ImagePreview
        imgWrapperStyle={'img-feature-banner'}
        imgSrc={imgSrc} />
      <div className="banner-content">
        <ContentCard
          headline={headline}
          h1text={h1text}
          h2text={h2text}
          buttonId={buttonId}
        >
          <Button
            buttonId={buttonId}
            buttonSize={'btn--splash'}
            buttonStyle={'btn--login'}
          >{buttonText}
          </Button>
        </ContentCard>
      </div>
    </div>
  )
}

export default FeatureBanner;
