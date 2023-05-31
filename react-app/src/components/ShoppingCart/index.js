import React, { useEffect, useState } from 'react';
import Button from '../Button';
import "./ShoppingCart.css";
import PageSplit from '../PageSplit';
import BottomNav from '../BottomNav';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import InputDiv from '../InputDiv';
import getCurrTime from '../HelperFns/GetCurrTime';

const ShoppingCart = () => {
  const shoppingCart = useSelector(state => state.shoppingCart.shoppingCart.items);
  const artworks = useSelector(state => state.artworks.allArtworks);
  const artlistings = useSelector(state => state.artlistings.allArtlistings)

  useEffect(() => {
    if (shoppingCart) {
      const cartObject = [];
      const artworkIds = Object.keys(shoppingCart);
      const artworkCart = artworkIds.forEach(artworkId => {
        const art = artworks[ artworkId ];
        const listing = artlistings[ art.artListing ];
        cartObject.push({ "id": art.id, "title": art.title, "image": art.image, "price": listing.price, "artist": art.artistName, "materials": art.materials })
      });
      setCartItems(cartObject);
      setIsLoaded(true);
    };
  }, [ shoppingCart, artworks, artlistings ]);

  const [ isLoaded, setIsLoaded ] = useState(false);
  const [ cartItems, setCartItems ] = useState([]);
  const [ disclaimerBool, setDisclaimerBool ] = useState(false);
  const [ taxBool, setTaxBool ] = useState(false);
  const [ cardNumber, setCardNumber ] = useState("");
  const [ expiryDate, setExpiryDate ] = useState("");
  const [ csv, setcsv ] = useState("");
  const [ validationErrors, setValidationErrors ] = useState({});

  const validate = () => {
    const errors = {};
    const { currDate } = getCurrTime();

    if (cardNumber.length !== 10 || !Number.isInteger(parseFloat(cardNumber))) errors.cardNumber = "Card number must be 10 digits long";
    if (csv.length !== 3 || !Number.isInteger(parseFloat(csv))) errors.csv = "CSV number must be 3 digits long";
    if (expiryDate <= currDate) errors.expiryDate = "Invalid expiry date";

    return errors;
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) return setValidationErrors(errors);
    window.alert("Purchase Confirmed");
  };

  return (
    <>
      {isLoaded && (
        <div className='split-pages-container'>
          <PageSplit pageSplitClass={"full"}>
            <div className="cart-container">
              <h1>Shopping Cart</h1>
              {cartItems.map((artwork) => (
                <div key={`shoppingcart-${artwork.id}`} className="cart-item">
                  <img src={artwork.image} alt={"image"} />
                  <div id='sc-item-info'>
                    <div className="item-labels">
                      <div>Title</div>
                      <div>Artist Name</div>
                      <div>Price</div>
                      <div>Materials</div>
                    </div>
                    <div className="item-details">
                      <div>{artwork.title}</div>
                      <div>{artworks[ artwork.id ].artistName}</div>
                      <div>{artwork.materials}</div>
                      <div>$ {artwork.price}</div>
                    </div>
                  </div>
                  <div className='item-remove'>
                    <Button buttonStyle={'btn--remove'} >Remove</Button>
                  </div>
                </div>
              ))}
            </div>
          </PageSplit>
          <PageSplit>
            <div className='cart-container'>
              <h1>Enter Payment Information</h1>
              <div className='window border'>
                <InputDiv
                  labelStyle={'__label'}
                  divStyle={'input--wide'}
                  label={'Card Number: *'}
                  error={validationErrors.cardNumber}
                >
                  <input
                    className='__input'
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                  />
                </InputDiv>
                <div className='date-time'>
                  <InputDiv label="Expiry Date: *"
                    divStyle={'input--wide'}
                    labelStyle={'__label'}
                    error={validationErrors.expiryDate}
                  >
                    <input
                      className='__input'
                      type='month'
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                    />
                  </InputDiv>
                  <InputDiv label="CSV: *"
                    divStyle={'input--wide'}
                    labelStyle={'__label'}
                    error={validationErrors.csv}
                  >
                    <input
                      className='__input'
                      type='text'
                      value={csv}
                      onChange={(e) => setcsv(e.target.value)}
                    />
                  </InputDiv>
                </div>
              </div>
              <br />
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
          </PageSplit >
        </div >
      )}
      <BottomNav>
        <Link to={'/artworks'} className="page-return">
          <h3>
            <i className="fa-solid fa-angle-left" /> Back to Artworks
          </h3>
        </Link>
      </BottomNav>
    </>
  );
};

export default ShoppingCart;
