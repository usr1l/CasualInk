const SET_CART = "shoppingcart/GET_CART";

export const thunkSetShoppingCart = () => async (dispatch) => {
  const response = await fetch('/api/shoppingcart/curr');

  const data = await response.json();
  if (response.ok) {
    dispatch(actionSetShoppingCart(data))
  };
  return data;
};

const actionSetShoppingCart = (data) => {
  return {
    type: SET_CART,
    payload: data
  };
};

export const thunkCartAddItem = (artlistingId) => async (dispatch) => {
  const response = await fetch('/api/shoppingcart/curr', {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "listing": artlistingId,
      "amount": 1
    })
  });

  const data = await response.json();
  if (response.ok) dispatch(actionSetShoppingCart(data));
  return data;
};

const initialState = { shoppingCart: {}, isLoading: true }

const shoppingCart = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return {
        ...state,
        shoppingCart: action.payload,
        isLoading: false
      }
    default:
      return state
  };
};

export default shoppingCart;
