import normalizeFn from "../components/HelperFns/NormalizeFn";
import { actionArtworkAddAuctionlisting } from "./artworks";
import { actionOwnerCreateAuctionListing } from "./session";


const GET_AUCTION_LISTINGS = "auctionlistings/GET_AUCTION_LISTINGS";
const CREATE_SINGLE_AUCTIONLISTING = "auctionlistings/CREATE_SINGLE_AUCTIONLISTING";

export const thunkGetAuctionListings = () => async (dispatch) => {
  const response = await fetch("/api/auctionlistings/")
  const data = await response.json();

  if (response.ok) {
    const auctionlistings = normalizeFn(data);
    dispatch(actionGetAuctionlistings(auctionlistings));
  };

  return data;
};

const actionGetAuctionlistings = (data) => {
  return {
    type: GET_AUCTION_LISTINGS,
    payload: data
  };
};

export const thunkAddAuctionlisting = (data) => async (dispatch) => {
  const response = await fetch("/api/auctionlistings/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const resData = await response.json();
  if (response.ok) {
    dispatch(actionAddAuctionlisting(resData));
    dispatch(actionOwnerCreateAuctionListing(resData));
    dispatch(actionArtworkAddAuctionlisting(resData.id, resData.artwork_id));
  };
  return resData;
};

const actionAddAuctionlisting = (data) => {
  return {
    type: CREATE_SINGLE_AUCTIONLISTING,
    payload: data
  };
};

const initialState = { allAuctionlistings: {}, singleAuctionlistingId: null, isLoading: true }

const auctionlistings = (state = initialState, action) => {
  switch (action.type) {
    case GET_AUCTION_LISTINGS:
      return {
        ...state,
        allAuctionlistings: action.payload
      }
    case CREATE_SINGLE_AUCTIONLISTING:
      return {
        ...state,
        allAuctionlistings: {
          ...state.allAuctionlistings,
          [ action.payload.id ]: action.payload
        }
      }
    default:
      return state
  }
}

export default auctionlistings;
