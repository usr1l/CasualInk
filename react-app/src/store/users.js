import normalizeFn from "../components/HelperFns/NormalizeFn";

const LOAD_USERS = 'users/LOAD_USERS';
const ADD_REVIEW = 'users/ADD_REVIEW';
const UPLOAD_ARTWORK = 'users/UPLOAD_ARTWORK';

export const thunkLoadAllUsers = () => async (dispatch) => {
  const response = await fetch('/api/users/');

  const data = await response.json();
  if (response.ok) {
    const userData = normalizeFn(data);
    dispatch(actionLoadAllUsers(userData));
  };

  return data;
};

const actionLoadAllUsers = (userData) => {
  return {
    type: LOAD_USERS,
    payload: userData
  }
};

export const actionUserAddReview = (res) => {
  return {
    type: ADD_REVIEW,
    payload: res
  };
};
// export const thunkLoadSingleUser = () => async(dispatch)

export const actionUploadUserArtwork = (id, ownerId) => {
  return {
    type: UPLOAD_ARTWORK,
    payload: {
      id, ownerId
    }
  };
};


const initialState = { allUsers: {}, singleUser: null, isLoading: true };

const users = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USERS:
      return {
        ...state,
        allUsers: {
          ...action.payload
        },
        isLoading: false
      };
    case ADD_REVIEW:
      return {
        ...state,
        allUsers: {
          ...state.allUsers,
          [ action.payload.receiver_id ]: {
            ...state.allUsers[ action.payload.receiver_id ],
            reviews: [ ...state.allUsers[ action.payload.receiver_id ].reviews, action.payload.id ]
          }
        }
      }
    case UPLOAD_ARTWORK:
      return {
        ...state,
        allUsers: {
          ...state.allUsers,
          [ action.payload.ownerId ]: {
            ...state.allUsers[ action.payload.ownerId ],
            artworks: [
              ...state.allUsers[ action.payload.ownerId ].artworks,
              action.payload.id
            ],
          }
        }
      }
    default:
      return state;
  }
};

export default users;
