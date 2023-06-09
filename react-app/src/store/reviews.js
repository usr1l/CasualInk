import normalizeFn from "../components/HelperFns/NormalizeFn";
import { actionUserAddReview } from "./users";

const LOAD_ALL_REVIEWS = 'reviews/LOAD_ALL';
const CREATE_REVIEW = 'reviews/CREATE_REVIEW';

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
  };
};

export const thunkCreateReview = (data) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${data.receiverId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ "review": data.comment })
  });

  const res = await response.json();
  if (response.ok) {
    dispatch(actionCreateReview(res));
    dispatch(actionUserAddReview(res));
  };

  return response;
};

const actionCreateReview = (data) => {
  return {
    type: CREATE_REVIEW,
    payload: data
  };
};

const initialState = { allReviews: {}, isLoading: true };

const reviews = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL_REVIEWS:
      const reviewsObj = normalizeFn(action.payload);
      return {
        ...state,
        allReviews: reviewsObj,
        isLoading: false
      }
    case CREATE_REVIEW:
      return {
        ...state,
        allReviews: {
          ...state.allReviews,
          [ action.payload.id ]: action.payload
        }
      }
    default:
      return state;
  }
};

export default reviews;
