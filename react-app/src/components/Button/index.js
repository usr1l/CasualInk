import React from 'react';
import './Button.css';

const STYLES = [
  'btn--primary',
  'btn--demo',
  'btn--login',
  'btn--dropdown'
];
const SIZES = [
  'btn--medium',
  'btn--splash',
  'btn--wide',
  'btn--small'
];


const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  disableButton,
  buttonId,
  value
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[ 0 ];
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[ 0 ];

  return (
    <div id={buttonId} className='btn-mobile'>
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize}`}
        onClick={onClick}
        type={type}
        disabled={disableButton || false}
        value={value}
      >
        {children}
      </button>
    </div>
  )
};

export default Button;
