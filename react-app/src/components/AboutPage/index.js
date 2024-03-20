import React from 'react';
import "./AboutPage.css";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../Button';

const AboutPage = () => {
  const { userId } = useParams();

  const userInfo = useSelector(state => state.users.allUsers[ userId ])

  return (
    <>
      <h1 style={{ fontSize: "32pt" }}>About</h1>
      <p style={{ fontSize: "18pt", border: "1px solid black", padding: "20px", boxSizing: "border-box" }}>{userInfo.bio}</p>
      <h1 style={{ fontSize: "32pt" }}>Info</h1>
      <div className='navbar-container'>
        <div className='three-section'>
          <Button
            buttonSize={'demo-wide'}
            disableButton={true}>
            Artworks: {userInfo.artworks.length}
          </Button>
        </div>
        <div className='three-section'>
          <Button
            buttonSize={'demo-wide'}
            disableButton={true}>
            Sale Listings: {userInfo.artListings.length}
          </Button>
        </div>
        <div className='three-section'>
          <Button
            buttonSize={'demo-wide'}
            disableButton={true}>
            Auction Listings: {userInfo.auctionListings.length}
          </Button>
        </div>
      </div>
    </>
  )
};

// export default AboutPage;
