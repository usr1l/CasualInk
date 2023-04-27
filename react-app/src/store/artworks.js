import normalizeFn from "../components/HelperFns/NormalizeFn.js";
import { actionDeleteOwnerArtwork, actionOwnerEditArtwork, actionUploadOwnerArtwork } from "./session.js";

const GET_ARTWORKS = "artworks/GET_ARTWORKS";
const UPLOAD_ARTWORK = "artworks/UPLOAD_ARTWORK";
const GET_SINGLE_ARTWORK_ID = "artwork/GET_SINGLE_ARTWORK_ID";
const EDIT_SINGLE_ARTWORK = "artwork/EDIT_SINGLE_ARTWORK";
const DELETE_SINGLE_ARTWORK = "artwork/DELETE_SINGLE_ARTWORK";
const ADD_ARTWORK_ARTLISTING = "artwork/ADD_ARTWORK_ARTLISTING";

export const thunkGetArtworks = () => async (dispatch) => {
  const response = await fetch("/api/artworks/");
  const data = await response.json();

  if (response.ok) {
    const artworks = normalizeFn(data);
    dispatch(actionGetArtworks(artworks));
  }
  return data;
}

const actionGetArtworks = (artworks) => {
  return {
    type: GET_ARTWORKS,
    payload: artworks
  };
};

export const thunkGetSingleArtworkId = (artworkId) => async (dispatch) => {

  function actionGetSingleArtworkId(artworkId) {
    return {
      type: GET_SINGLE_ARTWORK_ID,
      payload: artworkId
    };
  };

  dispatch(actionGetSingleArtworkId(artworkId));
};


export const thunkUploadArtwork = (artworkData) => async (dispatch) => {
  const response = await fetch("/api/artworks/new", {
    method: "POST",
    body: artworkData
  });

  const data = await response.json();

  if (response.ok) {
    dispatch(actionUploadArtwork(data));
    dispatch(actionUploadOwnerArtwork(data));
  }
  return data;
};

const actionUploadArtwork = (data) => {
  return {
    type: UPLOAD_ARTWORK,
    payload: data
  };
};

export const thunkEditArtwork = ({ formData, artworkId }) => async (dispatch) => {
  const res = await fetch(`/api/artworks/${artworkId}`, {
    method: "PUT",
    body: formData
  });

  const data = await res.json();
  if (res.ok) {
    dispatch(actionEditArtwork(data))
    dispatch(actionOwnerEditArtwork(data))
  }
  return data;
};

const actionEditArtwork = (data) => {
  return {
    type: EDIT_SINGLE_ARTWORK,
    payload: data
  };
};

export const thunkDeleteArtwork = (artworkId) => async (dispatch) => {
  const response = await fetch(`/api/artworks/${artworkId}`, {
    method: "DELETE"
  });
  const data = await response.json();
  if (response.ok) {
    dispatch(actionDeleteArtwork(artworkId))
    dispatch(actionDeleteOwnerArtwork(artworkId))
  };
  return data;
};

const actionDeleteArtwork = (artworkId) => {
  return {
    type: DELETE_SINGLE_ARTWORK,
    payload: artworkId
  }
};

export const actionArtworkAddArtlisting = (dataId, artworkId) => {
  return {
    type: ADD_ARTWORK_ARTLISTING,
    payload: {
      dataId,
      artworkId
    }
  }
};

const initialState = { allArtworks: {}, singleArtworkId: null, isLoading: true }

const artworks = (state = initialState, action) => {
  let updatedState;
  switch (action.type) {
    case GET_ARTWORKS:
      return {
        ...state,
        allArtworks: action.payload,
        isLoading: false
      };
    case UPLOAD_ARTWORK:
      return {
        ...state,
        allArtworks: {
          ...state.allArtworks,
          [ action.payload.id ]: action.payload
        }
      };
    case GET_SINGLE_ARTWORK_ID:
      return {
        ...state,
        singleArtworkId: action.payload
      };
    case EDIT_SINGLE_ARTWORK:
      return {
        ...state,
        allArtworks: {
          ...state.allArtworks,
          [ action.payload.id ]: action.payload
        }
      };
    case DELETE_SINGLE_ARTWORK:
      updatedState = {
        ...state,
        allArtworks: {
          ...state.allArtworks,
          singleArtworkId: null
        }
      }
      delete updatedState.allArtworks[ action.payload ]
      return updatedState;
    case ADD_ARTWORK_ARTLISTING:
      return {
        ...state,
        allArtworks: {
          ...state.allArtworks,
          [ action.payload.artworkId ]: {
            ...state.allArtworks[ action.payload.artworkId ],
            artListing: action.payload.dataId
          }
        }
      }
    default:
      return state;
  };
};

export default artworks;
