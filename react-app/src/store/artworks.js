import normalizeFn from "../components/HelperFns/NormalizeFn.js";

const GET_ARTWORKS = "artworks/GET_ARTWORKS";
const UPLOAD_ARTWORK = "artworks/UPLOAD_ARTWORK";

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

export const thunkUploadArtwork = (artworkData) => async (dispatch) => {
  const response = await fetch("/api/artworks/new", {
    method: "POST",
    body: artworkData
  });

  const data = await response.json();
  if (response.ok) {
    const data = await response.json();
    dispatch(actionUploadArtwork(data));
    return data
  } else return data.errors;
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
      console.log("ACTION========================", action.payload)
      return state
    default:
      return state
  };
};

export default artworks;
