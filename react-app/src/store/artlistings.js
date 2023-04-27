import normalizeFn from "../components/HelperFns/NormalizeFn.js";

const GET_ARTLISTINGS = "artlistings/GET_ARTLISTINGS";
const GET_SINGLE_ARTLISTING_ID = "artwork/GET_SINGLE_ARTLISTING_ID";

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

const initialState = { allArtlistings: {}, singleArtlistingId: null, isLoading: true }

const artlistings = (state = initialState, action) => {
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
    default:
      return state
  };
};

export default artlistings;
