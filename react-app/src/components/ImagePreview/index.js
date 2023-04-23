import React from 'react';
import './ImagePreview.css';

const imgSTYLES = [ '' ];

const ImagePreview = ({
  imgWrapperStyle,
  imgSrc,
  imgClassName,
  altTag
}) => {

  const checkImgStyle = imgSTYLES.includes(imgClassName) ? imgClassName : imgSTYLES[ 0 ];

  return (
    <div className={imgWrapperStyle ? imgWrapperStyle : `img-preview-wrapper`}>
      <img src={imgSrc} className={`img-preview ${checkImgStyle}`} alt={altTag}></img>
    </div>
  )
}

export default ImagePreview;
