import React, { useState } from 'react';
import InputDiv from '../InputDiv';
import Button from '../Button';
import { useModal } from "../../context/Modal";
import getCurrTime from '../HelperFns/GetCurrTime';
import "./PurchaseModal.css";
import { useDispatch } from 'react-redux';
import { thunkCheckoutItem } from '../../store/shoppingcarts';

const PurchaseModal = ({ artlistingId }) => {
  const { closeModal } = useModal();
  const [ cardNumber, setCardNumber ] = useState("");
  const [ expiryDate, setExpiryDate ] = useState("");
  const [ csv, setcsv ] = useState("");
  const [ validationErrors, setValidationErrors ] = useState({});

  const dispatch = useDispatch();

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
    dispatch(thunkCheckoutItem(artlistingId));
    closeModal();
    window.alert("Purchase Confirmed");
    window.location.reload();
  };

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
      <Button
        buttonSize={"btn--wide"}
        buttonStyle={"btn--demo"}
        onClick={handleCheckout}
      >
        Buy Now
      </Button>
    </div>
  );
};



export default PurchaseModal;
