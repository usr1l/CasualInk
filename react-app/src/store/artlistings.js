import normalizeFn from "../components/HelperFns/NormalizeFn.js";

const GET_ARTLISTINGS = "artlistings/GET_ARTLISTINGS";

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

const initialState = { allArtlistings: {}, singleArtlistingId: null, isLoading: true }

const artlistings = (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTLISTINGS:
      return {
        ...state,
        allArtlistings: action.payload,
        isLoading: false
      };
    default:
      return state
  };
};

export default artlistings;
