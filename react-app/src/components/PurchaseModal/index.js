import React, { useState } from 'react';
import "./PurchaseModal.css";
import InputDiv from '../InputDiv';

const PurchaseModal = () => {
  const [ cardNumber, setCardNumber ] = useState("");
  const [ expiryDate, setExpiryDate ] = useState("");
  const [ csv, setcsv ] = useState("");

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
            type="number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
        </InputDiv>
        <InputDiv label="Expiry Date: "
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
        <InputDiv label="CSV: "
          divStyle={'input--wide'}
          labelStyle={'__label'}
        // error={validationErrors.auctionDeadline}
        >
          <input
            className='__input'
            type='number'
            value={csv}
            onChange={(e) => setcsv(e.target.value)}
          // disabled={inputDisableBool}
          />
        </InputDiv>
      </div>
    </div>
  );
};



export default PurchaseModal;
