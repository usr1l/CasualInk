import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import PageSplit from '../PageSplit';
import { thunkGetSingleArtlistingId } from '../../store/artlistings';
import ProfileDescriptionCard from '../ProfileDescriptionCard';
import Button from "../Button";
import "./SaleListingPage.css";


const SaleListingPage = () => {
  const { artworkId, artlistingId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const userId = useSelector(state => state.session.user.id)
  const artwork = useSelector(state => state.artworks.allArtworks[ artworkId ]);
  const artlisting = useSelector(state => state.artlistings.allArtlistings[ artlistingId ]);

  const [ isLoaded, setIsLoaded ] = useState(false);
  const [ taxBool, setTaxBool ] = useState(false);
  const [ disclaimerBool, setDisclaimerBool ] = useState(false);
  const [ paymentInfo, setPaymentInfo ] = useState(false);

  useEffect(() => {
    if (!artwork || !artlisting) history.push("/not-found");
  }, [ artwork, artlisting, history ]);

  useEffect(() => {
    if (artlisting) {
      dispatch(thunkGetSingleArtlistingId(parseInt(artlisting.id)))
        .then(() => setIsLoaded(true));
    }
  }, [ dispatch, artlisting ]);


  return (
    <>
      {isLoaded && !!artlisting && (
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
                <div className='specs-box-element-label'>Price ($)</div>
                <div className='specs-box-element-text'>{`${artlisting.price}`}</div>
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
            <h1>Checkout</h1>
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
                    Taxes and other fees probably won't apply.
                    <br />
                    <br />
                    Item won't be shipped, so high chance it might get lost during shipping.
                    <br />
                    <br />
                    Shipping fee: 5%
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
                  <div className='expand-element'>No payment information is stored, but still refrain from entering real information.</div>
                )}
                <div className='specs-box-element-expand column click' onClick={() => setPaymentInfo(!paymentInfo)}>
                  {paymentInfo ? (
                    <>Payment Details ︾</>
                  ) : (
                    <>Payment Details ︽</>
                  )}
                </div>
                {paymentInfo && (
                  <div className='expand-element column'>
                    <div className='specs-box-element'>
                      <div className='specs-box-element-label'>Price ($)</div>
                      <div className='specs-box-element-text right'>{parseInt(artlisting.price)}</div>
                    </div>
                    <div className='specs-box-element'>
                      <div className='specs-box-element-label'>Tax (5%)</div>
                      <div className='specs-box-element-text right'>{artlisting.price * 0.05}</div>
                    </div>
                    <div className='specs-box-element'>
                      <div className='specs-box-element-label'>Total ($)</div>
                      <div className='specs-box-element-text right'>{artlisting.price * 1.05}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {userId !== artwork.ownerId && (artlisting.amount_available > 0) && (
              <Button
                buttonSize={'btn--wide'}
                buttonStyle={'btn--demo'}
              >
                Checkout
              </Button>
            )}
            {(artlisting.amount_available < 1) && (
              <Button
                buttonSize={"btn--wide"}
                disableButton={true}
              >
                Currently out of stock
              </Button>
            )}
          </PageSplit>
        </>
      )}
    </>
  )
};

export default SaleListingPage;
