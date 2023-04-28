import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../NavBar';
import "../ListingModal/ListingModal.css";
import InputDiv from '../InputDiv';
import Button from '../Button';
import { thunkAddArtlisting, thunkDeleteArtListing, thunkEditArtlisting } from '../../store/artlistings';
import { useHistory, useParams } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { thunkAddAuctionlisting } from '../../store/auctionlistings';

const EditAuctionListingModal = ({
  artworkId
}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [ startBid, setStartBid ] = useState("");
  const [ auctionDeadlineDate, setAuctionDeadlineDate ] = useState("")
  const [ auctionDeadlineTime, setAuctionDeadlineTime ] = useState("")

  const [ errors, setErrors ] = useState([]);
  const [ validationErrors, setValidationErrors ] = useState({});

  const { closeModal, modalRef, modalContent } = useModal();

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

  const validateAuction = () => {
    const validationErrors = {};
    if (`${auctionDeadlineDate} ${auctionDeadlineTime}` <= new Date()) validationErrors.auctionDeadline = 'Please provide an auction deadline, must be in the future';
    if ((parseFloat(startBid) < 0) ||
      (!Number.isInteger(100 * parseFloat(startBid)))) validationErrors.startBid = "Invalid price: value must be greater than zero and have at most two decimal places";

    return validationErrors
  };

  const submitAuctionListing = async (e) => {
    e.preventDefault();
    const validationErrors = validateAuction();
    if (Object.keys(validationErrors).length > 0) return setValidationErrors(validationErrors);
    const data = {
      "start_bid": startBid,
      "auction_deadline": `${auctionDeadlineDate} ${auctionDeadlineTime}`,
      "artwork_id": parseInt(artworkId)
    };

    const res = await dispatch(thunkAddAuctionlisting(data));
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
        <h1 className='form-header'>Create New Auction Listing</h1>
        <InputDiv
          label="Starting Bid: "
          divStyle={'input--wide'}
          labelStyle={'__label'}
          error={validationErrors.startBid}
        >
          <input
            className='__input'
            type="number"
            value={startBid}
            onChange={(e) => setStartBid(e.target.value)}
            required
          />
        </InputDiv>
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
        <Button
          onClick={submitAuctionListing}
          buttonStyle={'btn--demo'}
          buttonSize={'btn--splash'}
        >Create Auction Listing</Button>
      </div>
    </div>
  )
};

export default EditAuctionListingModal;
