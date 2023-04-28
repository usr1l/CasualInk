import normalizeFn from "../components/HelperFns/NormalizeFn.js";
import { actionArtworkAddArtlisting, actionArtworkDeleteArtListing, thunkGetArtworks } from "./artworks.js";
import { actionOwnerCreateArtlisting, actionOwnerDeleteArtListing, actionOwnerEditArtListing } from "./session.js";

const GET_ARTLISTINGS = "artlistings/GET_ARTLISTINGS";
const GET_SINGLE_ARTLISTING_ID = "artlistings/GET_SINGLE_ARTLISTING_ID";
const CREATE_SINGLE_ARTLISTING = "artlistings/CREATE_SINGLE_ARTLISTING";
const EDIT_SINGLE_ARTLISTING = "artlistings/EDIT_SINGLE_ARTLISTING";
const DELETE_SINGLE_ARTLISTING = "artlistings/DELETE_SINGLE_ARTLISTING";

export const thunkGetArtlistings = () => async (dispatch) => {
  const response = await fetch("/api/artlistings/");
  const data = await response.json();

  if (response.ok) {
    const artlistings = normalizeFn(data);
    dispatch(actionGetArtlistings(artlistings));
  };
  return data;
};

const actionGetArtlistings = (artlistings) => {
  return {
    type: GET_ARTLISTINGS,
    payload: artlistings
  };
};

export const thunkGetSingleArtlistingId = (artlistingId) => async (dispatch) => {

  function actionGetSingleArtlistingId(artlistingId) {
    return {
      type: GET_SINGLE_ARTLISTING_ID,
      payload: artlistingId
    };
  };

  dispatch(actionGetSingleArtlistingId(artlistingId));
};

export const thunkAddArtlisting = (data) => async (dispatch) => {
  const res = await fetch(`/api/artlistings/new`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const resData = await res.json();
  if (res.ok) {
    dispatch(actionAddArtlisting(resData));
    dispatch(actionOwnerCreateArtlisting(resData));
    dispatch(actionArtworkAddArtlisting(resData.id, resData.artwork_id));
  };
  return resData;
};

const actionAddArtlisting = (data) => {
  return {
    type: CREATE_SINGLE_ARTLISTING,
    payload: data
  };
};

export const thunkEditArtlisting = (data, artListingId) => async (dispatch) => {
  const res = await fetch(`/api/artlistings/${artListingId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const resData = await res.json();
  if (res.ok) {
    dispatch(actionEditArtListing(resData));
    dispatch(actionOwnerEditArtListing(resData));
  };
  return resData;
};

const actionEditArtListing = (data) => {
  return {
    type: EDIT_SINGLE_ARTLISTING,
    payload: data
  }
}

export const thunkDeleteArtListing = (artListing) => async (dispatch) => {
  const res = await fetch(`/api/artlistings/${artListing.id}`, {
    method: "DELETE"
  });

  const resData = await res.json();
  if (res.ok) {
    dispatch(actionDeleteArtListing(artListing.id));
    dispatch(actionArtworkDeleteArtListing(artListing.artwork_id));
    dispatch(actionOwnerDeleteArtListing(artListing.id));
  };
  return resData;
};

const actionDeleteArtListing = (artlistingId) => {
  return {
    type: DELETE_SINGLE_ARTLISTING,
    payload: artlistingId
  };
};

const initialState = { allArtlistings: {}, singleArtlistingId: null, isLoading: true }

const artlistings = (state = initialState, action) => {
  let updatedState;
  switch (action.type) {
    case GET_ARTLISTINGS:
      return {
        ...state,
        allArtlistings: action.payload,
        isLoading: false
      };
    case GET_SINGLE_ARTLISTING_ID:
      return {
        ...state,
        singleArtlistingId: action.payload
      };
    case CREATE_SINGLE_ARTLISTING:
      return {
        ...state,
        allArtlistings: {
          ...state.allArtlistings,
          [ action.payload.id ]: action.payload
        }
      };
    case EDIT_SINGLE_ARTLISTING:
      return {
        ...state,
        allArtlistings: {
          ...state.allArtlistings,
          [ action.payload.id ]: action.payload
        }
      };
    case DELETE_SINGLE_ARTLISTING: {
      updatedState = {
        ...state,
        allArtlistings: {
          ...state.allArtlistings,
          singleArtlistingId: null
        }
      }
      delete updatedState.allArtlistings[ action.payload ]
      return updatedState;
    }
    default:
      return state
  };
};

export default artlistings;
