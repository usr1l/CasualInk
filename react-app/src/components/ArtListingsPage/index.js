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
      if (listing) auctionslist.push(allArtworks[ listing.artwork_id ]);
    };

    for (const listing of artlistingsValues) {
      if (listing) artlistings.push(allArtworks[ listing.artwork_id ]);
    };

    setAuctions(auctionslist);
    setListings(artlistings);
    setIsLoaded(true);

  }, [ allArtlistings, allAuctionlistings, allArtworks ]);

  return (
    <>
      {isLoaded && (
        <PageContainer>
          <div className='page-content-container'>
            <HorizontalShowcase items={listings} caption={"Collect Artwork"} />
            <HorizontalShowcase items={auctions} caption={"Auction Listings"} />
          </div>
        </PageContainer>
      )}
    </>
  )
};

export default ArtListingsPage;
