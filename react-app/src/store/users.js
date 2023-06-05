import normalizeFn from "../components/HelperFns/NormalizeFn";

const LOAD_USERS = 'users/LOAD_USERS';

export const thunkLoadAllUsers = () => async (dispatch) => {
  const response = await fetch('/api/users/');

  const data = await response.json();
  const userData = normalizeFn(data);
  console.log(data)
  if (response.ok) {
    dispatch(actionLoadAllUsers(userData));
  };

  return userData;
};

const actionLoadAllUsers = (userData) => {
  return {
    type: LOAD_USERS,
    payload: userData
  }
};

const initialState = { allUsers: {}, singleUser: null, isLoading: false };

const users = (state = initialState, action) => {
  switch (action.payload) {
    case LOAD_USERS:
      return {
        ...state,
        allUsers: {
          ...action.payload
        },
        isLoading: true
      }
    default:
      return state;
  }
};

export default users;
