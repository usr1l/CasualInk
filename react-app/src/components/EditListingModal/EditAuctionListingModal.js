import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../NavBar';
import "../ListingModal/ListingModal.css";
import InputDiv from '../InputDiv';
import Button from '../Button';
import { thunkAddArtlisting, thunkDeleteArtListing, thunkEditArtlisting } from '../../store/artlistings';
import { useHistory, useParams } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { thunkAddAuctionlisting, thunkEditAuctionlisting } from '../../store/auctionlistings';
import OpenModalButton from '../OpenModalButton';
import getCurrTime from '../HelperFns/GetCurrTime';

const EditAuctionListingModal = ({
  auctionListingId
}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [ auctionDeadlineDate, setAuctionDeadlineDate ] = useState("")
  const [ auctionDeadlineTime, setAuctionDeadlineTime ] = useState("")

  const [ errors, setErrors ] = useState([]);
  const [ validationErrors, setValidationErrors ] = useState({});

  const { closeModal, modalRef, modalContent } = useModal();

  const auctionListing = useSelector(state => state.auctionlistings.allAuctionlistings[ auctionListingId ])

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

  useEffect(() => {
    if (auctionListing) {
      const newDate = new Date(auctionListing.auction_deadline);
      const newDateISO = newDate.toISOString();
      const dateDeadline = newDateISO.split("T")[ 0 ];
      const timeDeadlinePart = newDateISO.split("T")[ 1 ];
      const timeDeadline = timeDeadlinePart.split(".")[ 0 ];
      setAuctionDeadlineDate(dateDeadline);
      setAuctionDeadlineTime(timeDeadline);
    };
  }, [ auctionListing ]);


  const validateAuction = () => {
    const validationErrors = {};
    const { currDateTime } = getCurrTime();
    if (`${auctionDeadlineDate} ${auctionDeadlineTime}` <= currDateTime) {
      validationErrors.auctionDeadline = 'Please provide an auction deadline, must be in the future';
    };
    console.log(`${auctionDeadlineDate} ${auctionDeadlineTime}` <= currDateTime)
    console.log(`${auctionDeadlineDate} ${auctionDeadlineTime}`)
    console.log(currDateTime)
    console.log(validationErrors)
    return validationErrors
  };


  const submitAuctionListing = async (e) => {
    e.preventDefault();
    const validationErrors = validateAuction();
    if (Object.keys(validationErrors).length > 0) return setValidationErrors(validationErrors);
    const data = {
      "auction_deadline": `${auctionDeadlineDate} ${auctionDeadlineTime}`,
    };

    const res = await dispatch(thunkEditAuctionlisting(data, auctionListing.id));
    if (res.errors) return setErrors(res.errors);
    else closeModal();
  }


  return (
    <div className='small-form-modal'>
      <NavBar>
        <div
          className={`navbar-item smaller clicked`}
        >Auction Listing</div>
      </NavBar>
      <ul id='signup__error-list'>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <div className='form-container'>
        <h1 className='form-header'>Edit Auction Listing</h1>
        <InputDiv label="Auction Deadline: "
          divStyle={'input--wide'}
          labelStyle={'__label'}
          error={validationErrors.auctionDeadline}>
          <input
            name='auctionDeadlineDate'
            className='__input'
            type='date'
            value={auctionDeadlineDate}
            onChange={(e) => setAuctionDeadlineDate(e.target.value)}
          />
          <input
            name="auctionDeadlineTime"
            className='__input'
            type='time'
            value={auctionDeadlineTime}
            step={1}
            onChange={(e) => setAuctionDeadlineTime(e.target.value)}
          />
        </InputDiv>
        <div className='edit-buttons-container-small'>
          <Button
            onClick={submitAuctionListing}
            buttonStyle={'btn--demo'}
            buttonSize={'btn--splash'}
          >Update Auction Listing</Button>
          {/* <OpenModalButton
            buttonText={'Delete Sale Listing'}
            modalCSSClass={'btn btn--demo btn--medium'}
            modalComponent={<ConfirmDeleteModal deleteFn={thunkDeleteArtListing} itemId={artListing} directTo={`/artworks/${artListing.artwork_id}`} />}
          /> */}
        </div>
      </div>
    </div>
  )
};

export default EditAuctionListingModal;
