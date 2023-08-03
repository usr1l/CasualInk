import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from 'socket.io-client';
import "./AuctionBidInput.css";
import InputDiv from "../InputDiv";
import Button from "../Button";
import { actionEditAuctionListing } from "../../store/auctionlistings";
import { actionOwnerEditAuctionListing } from "../../store/session";

// initiate socket outside component
let socket;

const AuctionBidInput = ({ auctionListing, userBool }) => {
  const dispatch = useDispatch();

  const {
    current_bid,
    start_bid
  } = auctionListing;

  const minBid = () => {
    if (current_bid === "0") return (Math.ceil(parseFloat(start_bid) * 1.05));
    return Math.ceil(parseFloat(current_bid * 1.05));
  };

  const [ bidError, setBidError ] = useState("");
  const [ newBidPrice, setNewBidPrice ] = useState(minBid());

  const validateBidPrice = () => {
    let bidError = "";
    if ((newBidPrice && parseFloat(newBidPrice) < 0) ||
      (!Number.isInteger(parseFloat(newBidPrice))) ||
      ((current_bid ? current_bid : start_bid) * 1.05 > newBidPrice)
    ) bidError = "Bid value must be 5% greater than the current bid. (Rounded to dollar)";

    return bidError;
  };

  const sendBidData = (newBidPrice) => {
    socket.emit("auction_bid", { "current_bid": newBidPrice });
  };

  // function for creating a new bid
  const thunkCreateBid = (newBidPrice) => async (dispatch) => {
    const res = await fetch(`/api/auctionlistings/${auctionListing.id}/bid`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "current_bid": newBidPrice })
    });
    const data = await res.json();

    if (res.ok) {
      dispatch(actionEditAuctionListing(data));
      // dispatch(actionOwnerEditAuctionListing(data));
      setBidError("");
    };

    return data;
  };

  const handleBid = (e) => {
    e.preventDefault();
    const bidError = validateBidPrice();
    if (bidError) return setBidError(bidError);

    sendBidData(Math.ceil(parseFloat(newBidPrice)));
  };

  useEffect(() => {
    setNewBidPrice(minBid());
  }, [ current_bid ]);

  useEffect(() => {
    // production environment safe guard for connect address
    if (process.env.REACT_APP_ENV === "production") socket = io.connect('https://casualink.onrender.com/');
    else socket = io.connect('http://localhost:5000/');

    socket.on("update_bid", (current_bid) => {
      dispatch(thunkCreateBid(current_bid));
    });

    return (() => {
      socket.disconnect()
    })
  }, []);

  return (
    <>
      {userBool ? (
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
      ) : (
        <Button disableButton={true}>
          Auction is currently live.
        </Button>
      )}
    </>
  );
};


export default AuctionBidInput;
