import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../NavBar';
import "../ListingModal/ListingModal.css";
import InputDiv from '../InputDiv';
import Button from '../Button';
import { thunkDeleteArtListing, thunkEditArtlisting } from '../../store/artlistings';
import { useModal } from '../../context/Modal';
import { useHistory } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import ConfirmDeleteModal from '../ConfirmDeleteModal';

const EditArtListingModal = ({
  artListingId
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [ price, setPrice ] = useState(0);
  const [ amountAvailable, setAmountAvailable ] = useState(0);

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
  }, [ modalContent, closeModal, modalRef ]);

  const validateSale = () => {
    const validationErrors = {};
    if ((parseFloat(price) < 0) || (!Number.isInteger(100 * parseFloat(price)))) validationErrors.price = "Invalid price: value must be greater than zero and have at most two decimal places"
    console.log(amountAvailable < 0, !Number.isInteger(amountAvailable))
    if ((amountAvailable < 0) || !(Number.isInteger(parseInt(amountAvailable)))) validationErrors.amountAvailable = "Invalid data: amount needs to be a positive integer"
    return validationErrors;
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
      {/* <ul id='signup__error-list'>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul> */}
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
        <div className='edit-buttons-container-small'>
          <Button
            onClick={submitArtListing}
            buttonStyle={'btn--demo'}
          >Update Sale Listing</Button>
          <OpenModalButton
            buttonText={'Delete Sale Listing'}
            modalCSSClass={'btn btn--demo btn--medium'}
            modalComponent={<ConfirmDeleteModal deleteFn={thunkDeleteArtListing} itemId={artListing} directTo={`/artworks/${artListing.artwork_id}`} />}
          />
        </div>
      </div>
    </div>
  )
};

export default EditArtListingModal;
