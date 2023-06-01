import React from "react";
import './IconLabel.css';

const IconLabel = ({
  iconClass,
  labelText,
  iconLabelId,
  wrapperClass,
  onClick
}) => {

  return (
    <div onClick={onClick} id={iconLabelId} className={`icon-label-component ${wrapperClass}`}>
      <div className="icon-label-item-image-container">
        <i className={`icon-label-item-image ${iconClass}`}></i>
      </div>
      <span className="icon-label-item-text">{labelText}</span>
    </div>
  )
}

export default IconLabel;
