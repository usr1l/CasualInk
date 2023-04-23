import React from "react";
import './ProfileDescriptionCard.css'

const ProfileDescriptionCard = ({
  cardStyle,
  profileClass,
  profileId,
  heading,
  subHeading,
  children
}) => {

  const STYLES = [ '', 'membership-page-member-cards' ];
  const checkDivStyle = STYLES.includes(cardStyle) ? cardStyle : STYLES[ 0 ];

  return (
    <div className="profile-description-card-container" id={checkDivStyle}>
      <div className="profile-description-card">
        <i className={`${profileClass} profile-description-card-element`} id={profileId} />
        <div className="profile-description-card-element">
          <div className="profile-description-card-element-heading">{heading}</div>
          <div className="profile-description-card-element-subheading">{subHeading}</div>
        </div>
        {children}
      </div>
    </div>
  )
}

export default ProfileDescriptionCard;
