import React from 'react';
import './InputDiv.css';

const divSTYLES = [ "", 'input--wide' ];
const labelSTYLES = [];
const extraSTYLES = [];

const InputDiv = ({
  children,
  divStyle,
  labelStyle,
  extraStyles,
  label,
  labelFor,
  error
}) => {
  const checkDivStyle = divSTYLES.includes(divStyle) ? divStyle : divSTYLES[ 0 ];
  const checkLabelStyle = labelSTYLES.includes(labelStyle) ? labelStyle : labelSTYLES[ 0 ];
  const checkExtraStyles = extraSTYLES.includes(extraStyles) ? extraStyles : '';

  return (
    <div className={`input-div ${checkDivStyle} ${checkExtraStyles}`}>
      <label className={`input-label ${checkLabelStyle}`} htmlFor={labelFor}>{label}</label>
      {children}
      <div className='input-error-message'>{error}</div>
    </div>
  )
}

export default InputDiv;
