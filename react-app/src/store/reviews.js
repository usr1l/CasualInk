import normalizeFn from "../components/HelperFns/NormalizeFn";

const LOAD_ALL_REVIEWS = 'reviews/LOAD_ALL';

export const thunkLoadAllReviews = () => async (dispatch) => {
  const response = await fetch("/api/reviews/");

  const data = await response.json();

  if (response.ok) {
    dispatch(actionLoadAllReviews(data));
  };

  return data;
};

const actionLoadAllReviews = (data) => {
  return {
    type: LOAD_ALL_REVIEWS,
    payload: data
  }
};


const initialState = { allReviews: {}, isLoading: true };

const reviews = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL_REVIEWS:
      const reviewsObj = normalizeFn(action.payload);
      return {
        ...state,
        allReviews: reviewsObj
      }
    default:
      return state;
  }
};

export default reviews;
