import { actionCheckoutItem, thunkGetArtlistings } from "./artlistings";

const SET_CART = "shoppingcart/GET_CART";
const DELETE_CART = "shoppingcart/DELETE_CART";
const REMOVE_ITEM = "shoppingcart/REMOVE_ITEM";

export const thunkSetShoppingCart = () => async (dispatch) => {
  const response = await fetch('/api/shoppingcart/curr');

  const data = await response.json();
  if (response.ok) {
    dispatch(actionSetShoppingCart(data));
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

export const thunkCheckoutCart = (shoppingCartId) => async (dispatch) => {
  const response = await fetch(`/api/shoppingcart/${shoppingCartId}`);

  const data = await response.json();
  if (response.ok) {
    dispatch(thunkGetArtlistings());
    dispatch(actionDeleteCart());
  };

  return data;
};

export const thunkCheckoutItem = (artlistingId) => async (dispatch) => {
  const response = await fetch(`/api/shoppingcart/checkout/${artlistingId}`);

  const data = response.json();
  if (response.ok) dispatch(actionCheckoutItem(artlistingId));

  return data;
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
  };
};

export const thunkRemoveCartItem = (artworkId) => async (dispatch) => {
  const response = await fetch(`/api/shoppingcart/remove/${artworkId}`, {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json' }
  });

  const data = await response.json();

  if (response.ok) {
    dispatch(actionRemoveItem(artworkId));
  };

  return data;
};

const actionRemoveItem = (artworkId) => {
  return {
    type: REMOVE_ITEM,
    payload: artworkId
  };
};

const initialState = { shoppingCart: {}, isLoading: true }

const shoppingCart = (state = initialState, action) => {
  let updatedState;
  switch (action.type) {
    case SET_CART:
      return {
        ...state,
        shoppingCart: action.payload,
        isLoading: false
      };
    case DELETE_CART:
      return {
        ...state,
        shoppingCart: action.payload
      };
    case REMOVE_ITEM:
      updatedState = {
        ...state,
        shoppingCart: {
          ...state.shoppingCart,
          items: { ...state.shoppingCart.items }
        }
      };
      delete updatedState.shoppingCart.items[ action.payload ];
      return updatedState
    default:
      return state;
  };
};

export default shoppingCart;
