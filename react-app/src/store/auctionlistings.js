import normalizeFn from "../components/HelperFns/NormalizeFn";
import { actionArtworkAddAuctionlisting, actionArtworkDeleteAuctionListing } from "./artworks";
import { actionOwnerCreateAuctionListing, actionOwnerDeleteAuctionListing, actionOwnerEditAuctionListing } from "./session";

const GET_AUCTION_LISTINGS = "auctionlistings/GET_AUCTION_LISTINGS";
const CREATE_SINGLE_AUCTIONLISTING = "auctionlistings/CREATE_SINGLE_AUCTIONLISTING";
const EDIT_SINGLE_AUCTIONLISTING = "auctionlistings/EDIT_SINGLE_AUCTIONLISTING";
const DELETE_SINGLE_AUCTIONLISTING = "auctionlistings/DELETE_SINGLE_AUCTIONLISTING";

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
    dispatch(actionOwnerCreateAuctionListing(resData.id));
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

export const thunkEditAuctionlisting = (data, auctionListingId) => async (dispatch) => {
  const response = await fetch(`/api/auctionlistings/${auctionListingId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const resData = await response.json();
  if (response.ok) {
    dispatch(actionEditAuctionListing(resData));
  };
  return resData;
};

export const actionEditAuctionListing = (data) => {
  return {
    type: EDIT_SINGLE_AUCTIONLISTING,
    payload: data
  };
};

export const thunkDeleteAuctionListing = (auctionListing) => async (dispatch) => {
  const res = await fetch(`/api/auctionlistings/${auctionListing.id}`, {
    method: "DELETE"
  });

  const resData = await res.json();
  if (res.ok) {
    dispatch(actionDeleteAuctionListing(auctionListing.id));
    dispatch(actionArtworkDeleteAuctionListing(auctionListing.artwork_id));
    dispatch(actionOwnerDeleteAuctionListing(auctionListing.id));
  };
  return resData;
};

const actionDeleteAuctionListing = (auctionlistingId) => {
  return {
    type: DELETE_SINGLE_AUCTIONLISTING,
    payload: auctionlistingId
  }
}

const initialState = { allAuctionlistings: {}, singleAuctionlistingId: null, isLoading: true }

const auctionlistings = (state = initialState, action) => {
  let updatedState;
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
    case EDIT_SINGLE_AUCTIONLISTING:
      return {
        ...state,
        allAuctionlistings: {
          ...state.allAuctionlistings,
          [ action.payload.id ]: action.payload
        }
      }
    case DELETE_SINGLE_AUCTIONLISTING:
      updatedState = {
        ...state,
        allAuctionlistings: {
          ...state.allAuctionlistings,
          singleAuctionlistingId: null
        }
      };
      delete updatedState.allAuctionlistings[ action.payload ]
      return updatedState;
    default:
      return state
  }
}

export default auctionlistings;
