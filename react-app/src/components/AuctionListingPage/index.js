import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PageSplit from '../PageSplit';
import ProfileDescriptionCard from '../ProfileDescriptionCard';
import AuctionBidInput from '../AuctionBidInput';
import CountdownTimer from '../CountdownTimer';
import "./AuctionListingPage.css";
import Button from '../Button';

const AuctionListingPage = () => {

  const { artworkId, auctionlistingId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const artwork = useSelector(state => state.artworks.allArtworks[ artworkId ]);
  const auctionlisting = useSelector(state => state.auctionlistings.allAuctionlistings[ auctionlistingId ])

  const [ isLoaded, setIsLoaded ] = useState(false);
  const [ disclaimerBool, setDisclaimerBool ] = useState(false);
  const [ taxBool, setTaxBool ] = useState(false);


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

  const {
    current_bid,
    auction_deadline,
    last_update,
    list_date,
    start_bid,
    active
  } = auctionlisting;

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
                <div className='specs-box-element-label'>Time Listed</div>
                <div className='specs-box-element-text'>{`${list_date.slice(0, 25)}`}</div>
              </div>
              <div className='specs-box-element'>
                <div className='specs-box-element-label'>Time of Last Bid</div>
                <div className='specs-box-element-text'>{`${last_update.slice(0, 25)}`}</div>
              </div>
              <div className='specs-box-element'>
                <div className='specs-box-element-label'>Auction Deadline</div>
                <div className='specs-box-element-text'>{`${auction_deadline.slice(0, 25)}`}</div>
              </div>
              <div className='specs-box-element'>
                <div className='specs-box-element-label'>Start Bid ($)</div>
                <div className='specs-box-element-text'>{`${start_bid}`}</div>
              </div>
              <div className='specs-box-element'>
                <div className='specs-box-element-label'>Current Bid ($)</div>
                <div className='specs-box-element-text'>{`${current_bid === "0" ? "No bid has been made" : current_bid}`}</div>
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
            <div className='checkout-box'>
              <div className='checkout-page-element'>
                <div className='specs-box-element-expand column click' onClick={() => setTaxBool(!taxBool)}>
                  {taxBool ? (
                    <>Taxes and Fees ︾</>
                  ) : (
                    <>Taxes and Fees ︽</>
                  )}
                </div>
                {taxBool && (
                  <div className='expand-element'>
                    A commission fee will be automatically applied to your bid.
                    <br />
                    <br />
                    Item won't be shipped, so high chance it might get lost during shipping.
                    <br />
                    <br />
                    Commission fee: 5%
                  </div>
                )}
                <div className='specs-box-element-expand column click' onClick={() => setDisclaimerBool(!disclaimerBool)}>
                  {disclaimerBool ? (
                    <>Policies and Disclaimers ︾</>
                  ) : (
                    <>Policies and Disclaimers ︽</>
                  )}
                </div>
                {disclaimerBool && (
                  <div className='expand-element'>
                    No payment information is stored, but still refrain from entering real information.
                    <br />
                    <br />
                    Your bid must be at least 5% higher than the current bid price.
                  </div>
                )}
              </div>
            </div>
            <h1>Bid</h1>
            {active ? (
              <>
                <CountdownTimer
                  endDate={auction_deadline.slice(0, 25)}
                  label={"Time Remaining"}
                />
                <br />
                <div id="bid-container">
                  <AuctionBidInput auctionListing={auctionlisting}></AuctionBidInput>
                </div>
              </>
            ) : (
              <Button
                buttonSize={"btn--wide"}
                buttonStyle={"btn--demo"}
                disableButton={true}
              >Currently no active auction. Check back later.
              </Button>
            )}
          </PageSplit>
        </>
      )}
    </>
  )
};

export default AuctionListingPage;
