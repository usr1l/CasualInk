import normalizeFn from "../components/HelperFns/NormalizeFn.js";

const GET_ARTWORKS = "artworks/GET_ARTWORKS";
const UPLOAD_ARTWORK = "artworks/UPLOAD_ARTWORK";
const GET_SINGLE_ARTWORK_ID = "artwork/GET_SINGLE_ARTWORK_ID";

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

export const actionGetSingleArtworkId = (artworkId) => {
  return {
    type: GET_SINGLE_ARTWORK_ID,
    payload: artworkId
  };
};

export const thunkUploadArtwork = (artworkData) => async (dispatch) => {
  const response = await fetch("/api/artworks/new", {
    method: "POST",
    body: artworkData
  });

  const data = await response.json();

  if (response.ok) {
    dispatch(actionUploadArtwork(data));
    return data
  } else return data;
};

const actionUploadArtwork = (data) => {
  return {
    type: UPLOAD_ARTWORK,
    payload: data
  };
};

const initialState = { allArtworks: {}, singleArtworkId: null, isLoading: true }

const artworks = (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTWORKS:
      return {
        ...state,
        allArtworks: action.payload,
        isLoading: false
      };
    case UPLOAD_ARTWORK:
      return state;
    case GET_SINGLE_ARTWORK_ID:
      return {
        ...state,
        singleArtworkId: action.payload
      };
    default:
      return state;
  };
};

export default artworks;
