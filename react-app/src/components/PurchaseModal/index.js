import React, { useState } from 'react';
import "./PurchaseModal.css";
import InputDiv from '../InputDiv';
import Button from '../Button';
import getCurrTime from '../HelperFns/GetCurrTime';

const PurchaseModal = () => {
  const [ cardNumber, setCardNumber ] = useState("");
  const [ expiryDate, setExpiryDate ] = useState("");
  const [ csv, setcsv ] = useState("");

  const [ validationErrors, setValidationErrors ] = useState({});

  const validate = () => {
    const errors = {};
    const { currDate } = getCurrTime();

    if (cardNumber.length !== 10 || !Number.isInteger(parseFloat(cardNumber))) errors.cardNumber = "Card number must be 10 digits long";
    if (csv.length !== 10 || !Number.isInteger(parseFloat(csv))) errors.csv = "CSV number must be 3 digits long";
    if (expiryDate <= currDate) errors.expiryDate = "Invalid expiry date";

    return errors;
  };
  // const handleCheckout =   () => {
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
