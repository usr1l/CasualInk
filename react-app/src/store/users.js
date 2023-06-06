import normalizeFn from "../components/HelperFns/NormalizeFn";

const LOAD_USERS = 'users/LOAD_USERS';

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

// export const thunkLoadSingleUser = () => async(dispatch)

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
      }
    default:
      return state;
  }
};

export default users;
