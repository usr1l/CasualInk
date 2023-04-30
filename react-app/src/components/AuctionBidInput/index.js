import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from 'socket.io-client';
import "./AuctionBidInput.css";
import InputDiv from "../InputDiv";
import Button from "../Button";

let socket;

const AuctionBidInput = ({ auctionListing }) => {
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
    if (current_bid === "0") return parseFloat(start_bid) * 1.05;
    return parseFloat(current_bid * 1.05);
  };

  const user = useSelector(state => state.session.user);

  const [ bidError, setBidError ] = useState("")
  const [ newBidPrice, setNewBidPrice ] = useState(minBid());

  const validateBidPrice = () => {
    if ((newBidPrice && parseFloat(newBidPrice) < 0) ||
      (!Number.isInteger(100 * parseFloat(newBidPrice))) ||
      (parseFloat(current_bid) * 1.05 > newBidPrice)
    ) setBidError("Invalid bid: value must 5% greater than the current bid")
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
      >
        Submit Bid
      </Button>
    </>
  )
};


export default AuctionBidInput;
