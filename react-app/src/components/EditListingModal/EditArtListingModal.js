import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../NavBar';
import "../ListingModal/ListingModal.css";
import InputDiv from '../InputDiv';
import Button from '../Button';
import { thunkDeleteArtListing, thunkEditArtlisting } from '../../store/artlistings';
import { useModal } from '../../context/Modal';

const EditArtListingModal = ({
  artListingId
}) => {
  const dispatch = useDispatch();
  const [ price, setPrice ] = useState("");
  const [ amountAvailable, setAmountAvailable ] = useState("");

  const [ errors, setErrors ] = useState([]);
  const [ validationErrors, setValidationErrors ] = useState({});

  const { closeModal, modalRef, modalContent } = useModal();

  const artListing = useSelector(state => state.artlistings.allArtlistings[ artListingId ])

  useEffect(() => {
    if (artListing) {
      setPrice(parseFloat(artListing.price))
      setAmountAvailable(parseInt(artListing.amount_available))
    }
  }, [ artListing ])

  useEffect(() => {
    if (!modalContent) return;

    const modalClose = (e) => {
      if (!modalRef.current.contains(e.target)) {
        closeModal()
      };
    };
    document.addEventListener("click", modalClose);

    return () => document.removeEventListener("click", modalClose);
  }, [ modalContent ]);

  const validateSale = () => {
    const validationErrors = {};
    if ((parseFloat(price) < 0) || (!Number.isInteger(100 * parseFloat(price)))) validationErrors.price = "Invalid price: value must be greater than zero and have at most two decimal places"
    if (!(amountAvailable > 0) || (!Number.isInteger(parseInt(amountAvailable)))) validationErrors.amountAvailable = "Invalid data: amount needs to be a positive integer"
    return validationErrors;
  };

  const deleteArtListing = (e) => {
    e.preventDefault();
    const res = dispatch(thunkDeleteArtListing(artListing.id));
    if (res.errors) setErrors(res.errors)
    else closeModal();
  };

  const submitArtListing = async (e) => {
    e.preventDefault();
    const validationErrors = validateSale();
    if (Object.keys(validationErrors).length > 0) return setValidationErrors(validationErrors);

    const data = {
      price,
      "amount_available": amountAvailable
    };

    const res = await dispatch(thunkEditArtlisting(data, artListing.id))
    if (res.errors) return setErrors(res.errors);
    else closeModal();
  };

  return (
    <div className='small-form-modal'>
      <NavBar>
        <div
          className={`navbar-item smaller clicked`}
        >Sale Listing</div>
      </NavBar>
      <ul id='signup__error-list'>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <div className='form-container'>
        <h1 className='form-header'>Update Sale Listing</h1>
        <InputDiv
          label="Price ($): "
          divStyle={'input--wide'}
          labelStyle={'__label'}
          error={validationErrors.price}
        >
          <input
            className='__input'
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </InputDiv>
        <InputDiv
          label="Amount Available for Sale: "
          divStyle={'input--wide'}
          labelStyle={'__label'}
          error={validationErrors.amountAvailable}
        >
          <input
            className='__input'
            type="number"
            value={amountAvailable}
            onChange={(e) => setAmountAvailable(e.target.value)}
            required
          />
        </InputDiv>
        <div>
          <Button
            onClick={submitArtListing}
            buttonStyle={'btn--demo'}
            buttonSize={'btn--splash'}
          >Update Sale Listing</Button>
          <Button
            onClick={deleteArtListing}
            buttonStyle={'btn--demo'}
            buttonSize={'btn--splash'}
          >Delete Sale Listing</Button>
        </div>
      </div>
    </div>
  )
};

export default EditArtListingModal;
