import { actionCheckoutItem } from "./artlistings";

const SET_CART = "shoppingcart/GET_CART";
const DELETE_CART = "shoppingcart/DELETE_CART";

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

export const thunkCheckoutCart = () => async (dispatch) => {
  const response = await fetch('/api/shoppingcart/checkout', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
  });
};

export const thunkCheckoutItem = (artworkId) => async (dispatch) => {
  const response = await fetch(`/api/shoppingcart/checkout/${artworkId}`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
  });

  const data = response.json()
  if (response.ok) dispatch(actionCheckoutItem(artworkId))
};

export const thunkDeleteCart = () => async (dispatch) => {
  const response = await fetch('/api/shoppingcart/curr', {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json' }
  });

  const data = await response.json();
  if (response.ok) dispatch(actionDeleteCart());
  return data;
};

const actionDeleteCart = () => {
  return {
    type: "DELETE_CART",
    payload: {}
  }
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
    case DELETE_CART:
      return {
        ...state,
        shoppingCart: action.payload
      }
    default:
      return state
  };
};

export default shoppingCart;
