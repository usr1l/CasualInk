import normalizeFn from "../components/HelperFns/NormalizeFn.js";

const GET_ARTWORKS = "artworks/GET_ARTWORKS";

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

const initialState = { allArtworks: {}, singleArtworkId: null, isLoading: true }

const artworks = (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTWORKS:
      return {
        ...state,
        allArtworks: action.payload,
        isLoading: false
      };
    default:
      return state
  };
};

export default artworks;
