import React, { useEffect, useState } from 'react';
import "./AuctionListingPage.css";
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PageSplit from '../PageSplit';
import ProfileDescriptionCard from '../ProfileDescriptionCard';

const AuctionListingPage = () => {
  const { artworkId, auctionlistingId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const artwork = useSelector(state => state.artworks.allArtworks[ artworkId ]);
  const auctionlisting = useSelector(state => state.auctionlistings.allAuctionlistings[ auctionlistingId ])

  const [ isLoaded, setIsLoaded ] = useState(false);

  useEffect(() => {
    if (!artwork || !auctionlisting) history.push("/not-found");
  }, [ artwork, auctionlisting, history ]);

  useEffect(() => {
    if (auctionlisting) {
      // dispatch(thunkGetSingleArtlistingId(parseInt(artlisting.id)))
      // .then(() => );
      setIsLoaded(true)
    }
  }, [ dispatch, auctionlisting ]);



  return (
    <>
      {isLoaded && !!auctionlisting && (
        <>
          <PageSplit>
            <h1>Details</h1>
            <div className='specs-box'>
              <div className='specs-box-element'>
                <div className='specs-box-element-label'>Title</div>
                <div className='specs-box-element-text'>{artwork.title}</div>
              </div>
              <div className='specs-box-element'>
                <div className='specs-box-element-label'>Materials</div>
                <div className='specs-box-element-text'>{artwork.materials}</div>
              </div>
              <div className='specs-box-element'>
                <div className='specs-box-element-label'>Size</div>
                <div className='specs-box-element-text'>{`${artwork.height} x ${artwork.width} in | ${parseFloat(artwork.height * 2.54).toFixed(2)} x ${parseFloat(artwork.width * 2.54).toFixed(2)} cm`}</div>
              </div>
              <div className='specs-box-element'>
                <div className='specs-box-element-label'>Start Bid ($)</div>
                <div className='specs-box-element-text'>{`${auctionlisting.start_bid}`}</div>
              </div>
            </div>
            <div className='specs-box'>
              <ProfileDescriptionCard
                imgSrc={artwork.owner.profilePic ? artwork.owner.profilePic : ""}
                heading={`${artwork.owner.firstname}`}
                subHeading={`Member since ${artwork.owner.joinDate.split(" ")[ 3 ]}`}
              />
            </div>
          </PageSplit>
          <PageSplit>
            <h1>Auction Details</h1>
          </PageSplit>
        </>
      )}
    </>
  )
};

export default AuctionListingPage;
