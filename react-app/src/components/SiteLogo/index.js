import React from 'react';
// import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import './SiteLogo.css';

const SiteLogo = () => {
  return (
    <Link to="/" id='site-logo'>
      <img src={''} alt='home' />
    </Link>
  )
};

export default SiteLogo;
