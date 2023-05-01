import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from 'socket.io-client';
import "./AuctionBidInput.css";
import InputDiv from "../InputDiv";
import Button from "../Button";
import { actionEditAuctionListing } from "../../store/auctionlistings";
import { actionOwnerEditAuctionListing } from "../../store/session";

let socket;

const AuctionBidInput = ({ auctionListing }) => {
  const dispatch = useDispatch();

  const {
    current_bid,
    active,
    artwork_id,
    auction_deadline,
    last_update,
    list_date,
    owner_id,
    start_bid
  } = auctionListing;

  const minBid = () => {
    if (current_bid === "0") return (parseFloat(start_bid) * 1.06).toFixed(2);
    return parseFloat(current_bid * 1.06).toFixed(2);
  };

  const user = useSelector(state => state.session.user);

  const [ bidError, setBidError ] = useState("")
  const [ newBidPrice, setNewBidPrice ] = useState(minBid());


  const validateBidPrice = () => {
    let bidError = "";
    if ((newBidPrice && parseFloat(newBidPrice) < 0) ||
      (!Number.isInteger(100 * parseFloat(newBidPrice))) ||
      ((parseFloat(current_bid) ? parseFloat(current_bid) : parseFloat(start_bid)) * 1.05 > newBidPrice)
    ) bidError = "Invalid bid: value must 5% greater than the current bid";

    return bidError;
  };


  const thunkCreateBid = (newBidPrice) => async (dispatch) => {
    const res = await fetch(`/api/auctionlistings/${auctionListing.id}/bid`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "current_bid": newBidPrice })
    });
    const data = await res.json();

    if (res.ok) {
      dispatch(actionEditAuctionListing(data));
      dispatch(actionOwnerEditAuctionListing(data));
    };

    return data;
  };


  const handleBid = async (e) => {
    e.preventDefault();
    const bidError = validateBidPrice();
    if (bidError) return setBidError(bidError);

    const res = await dispatch(thunkCreateBid(newBidPrice));

  };

  useEffect(() => {
    if (process.env.REACT_APP_ENV === "production") socket = io.connect('https://casualink.onrender.com/');
    else socket = io.connect('http://localhost:5000/');

    // socket.on("chat", (chat) => {
    //   setMessages(messages => [ ...messages, chat ])
    // })
    // // when component unmounts, disconnect
    // return (() => {
    //   socket.disconnect()
    // })
  }, [])

  return (
    <>
      <InputDiv
        labelStyle={'__label'}
        error={bidError}
        label={'Enter Bid: *'}
      >
        <input
          className='__input'
          type="number"
          value={newBidPrice}
          onChange={(e) => setNewBidPrice(e.target.value)}
          required
        />
      </InputDiv>
      <Button
        buttonSize={'btn--wide'}
        buttonStyle={'btn--demo'}
        onClick={handleBid}
      >
        Submit Bid
      </Button>
    </>
  );
};


export default AuctionBidInput;
