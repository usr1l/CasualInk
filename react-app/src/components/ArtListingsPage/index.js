import React, { useEffect, useState } from 'react';
import "./ArtListingsPage.css";
import PageContainer from '../PageContainer';
import { useSelector } from 'react-redux';
import HorizontalShowcase from '../HorizontalShowcase';

const ArtListingsPage = () => {
  const { allAuctionlistings } = useSelector(state => state.auctionlistings);
  const { allArtlistings } = useSelector(state => state.artlistings);
  const { allArtworks } = useSelector(state => state.artworks);

  const [ isLoaded, setIsLoaded ] = useState(false);
  const [ auctions, setAuctions ] = useState([]);
  const [ listings, setListings ] = useState([]);

  useEffect(() => {
    const auctionlistingsValues = allAuctionlistings ? Object.values(allAuctionlistings) : [];
    const artlistingsValues = allArtlistings ? Object.values(allArtlistings) : [];

    const auctionslist = [];
    const artlistings = [];

    for (const listing of auctionlistingsValues) {
      auctionslist.push(allArtworks[ listing.artwork_id ]);
    };

    for (const listing of artlistingsValues) {
      artlistings.push(allArtworks[ listing.artwork_id ]);
    };

    setAuctions(auctionslist);
    setListings(artlistings);
    setIsLoaded(true);

  }, [ allArtworks ]);

  return (
    <>
      {isLoaded && (
        <PageContainer>
          <div className='page-content-container'>
            <HorizontalShowcase items={listings} caption={"Collect Artwork"}></HorizontalShowcase>

            <HorizontalShowcase items={auctions} caption={"Auction Listings"}></HorizontalShowcase>
          </div>
        </PageContainer>
      )}
    </>
  )
};

export default ArtListingsPage;
