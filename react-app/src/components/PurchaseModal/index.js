import React, { useState } from 'react';
import "./PurchaseModal.css";
import InputDiv from '../InputDiv';
import Button from '../Button';

const PurchaseModal = () => {
  const [ cardNumber, setCardNumber ] = useState("");
  const [ expiryDate, setExpiryDate ] = useState("");
  const [ csv, setcsv ] = useState("");

  const [ validationErrors, setValidationErrors ] = useState({});

  // const handleCheckout = () => {
  //   if
  // };

  return (
    <div className='purchase-modal'>
      <div className='form-container'>
        <h1>Enter Payment Information</h1>
        <InputDiv
          labelStyle={'__label'}
          divStyle={'input--wide'}
          label={'Card Number: *'}
        >
          <input
            className='__input'
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
        </InputDiv>
        <InputDiv label="Expiry Date: *"
          divStyle={'input--wide'}
          labelStyle={'__label'}
        // error={validationErrors.auctionDeadline}
        >
          <input
            className='__input'
            type='month'
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          // disabled={inputDisableBool}
          />
        </InputDiv>
        <InputDiv label="CSV: *"
          divStyle={'input--wide'}
          labelStyle={'__label'}
        // error={validationErrors.auctionDeadline}
        >
          <input
            className='__input'
            type='text'
            value={csv}
            onChange={(e) => setcsv(e.target.value)}
          // disabled={inputDisableBool}
          />
        </InputDiv>
      </div>
      <Button
        buttonSize={"btn--splash"}
        buttonStyle={"btn--demo"}
      // onClick={handleCheckout}
      >
        Buy Now
      </Button>
    </div>
  );
};



export default PurchaseModal;
