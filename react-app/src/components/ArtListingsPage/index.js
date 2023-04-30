import React from 'react';
import "./ArtListingsPage.css";
import PageContainer from '../PageContainer';
import BottomNav from '../BottomNav';
import { useSelector } from 'react-redux';

const ArtListingsPage = () => {
  const { allAuctionlistings } = useSelector(state => state.auctionlistings);
  // const {allArtlistings } = useSelector()

  return (
    <>
      <PageContainer>
        <div className='page-content-container'>
          <h1>Collect Artwork</h1>
          <div className='artwork-showcase-container'>

          </div>
          <h1>Auction Listings</h1>
          <div className='artwork-showcase-container'>

          </div>
        </div>
      </PageContainer>
    </>
  )
};

export default ArtListingsPage;
