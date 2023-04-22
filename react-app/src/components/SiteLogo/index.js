import React from 'react';
import casualInk from "../static/casual-ink.png"
import { Link } from 'react-router-dom';
import './SiteLogo.css';

const SiteLogo = () => {
  return (
    <Link to="/" id='site-logo'>
      <img src={casualInk} alt='home' />
    </Link>
  )
};

export default SiteLogo;
