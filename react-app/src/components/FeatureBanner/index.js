import React from "react";
import './FeatureBanner.css'

const FeatureBanner = ({
  cardStyle,
  iconClass,
  iconId,
  heading,
  subHeading,
  children
}) => {

  const STYLES = [ '' ];
  const checkDivStyle = STYLES.includes(cardStyle) ? cardStyle : STYLES[ 0 ];

  return (
    <div className="banner-container" id={checkDivStyle}>
      <div className="banner">
        <i className={`${iconClass} banner-element`} id={iconId} />
        <div className="banner-element">
          <div className="banner-element-heading">{heading}</div>
          <div className="banner-element-subheading">{subHeading}</div>
        </div>
        {children}
      </div>
    </div>
  )
}

export default FeatureBanner;
