import React from 'react';
// import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import './SiteLogo.css';

const SiteLogo = () => {
  return (
    <Link to="/" className='site-logo'>
      <img id='site-logo' src={''} alt='logo' />
    </Link>
  )
};

export default SiteLogo;
