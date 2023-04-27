import normalizeFn from "../components/HelperFns/NormalizeFn";


const GET_AUCTION_LISTINGS = "auctionlistings/GET_AUCTION_LISTINGS";

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

const initialState = { allAuctionlistings: {}, singleAuctionlistingId: null, isLoading: true }

const auctionlistings = (state = initialState, action) => {
  switch (action.type) {
    case GET_AUCTION_LISTINGS:
      return {
        ...state,
        allAuctionlistings: action.payload
      }
    default:
      return state
  }
}

export default auctionlistings;
