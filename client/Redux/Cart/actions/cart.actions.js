import cartTypes from "../types/cart.types";
import axios from "axios";

export const fetchCartStart = () => ({
  type: cartTypes.FETCH_CART_START
});

export const fetchCartFailure = error => ({
  type: cartTypes.FETCH_CART_FAILURE,
  payload: error
});

export const fetchCartSuccess = data => ({
  type: cartTypes.FETCH_CART_SUCCESS,
  payload: data
});

//Thunks

export const incrementItemStartAsync = (cartItemId, cartId) => {
  return dispatch => {
    dispatch(fetchCartStart());
    return axios
      .put(`api/cart-items/${cartItemId}/increment/`)
      .then(() => {
        dispatch(fetchCartStartAsync(cartId));
      })
      .catch(error => {
        dispatch(fetchCartFailure(error));
      });
  };
};

export const decrementItemStartAsync = (cartItemId, cartId) => {
  return dispatch => {
    dispatch(fetchCartStart());
    return axios
      .put(`api/cart-items/${cartItemId}/decrement/`)
      .then(() => {
        dispatch(fetchCartStartAsync(cartId));
      })
      .catch(error => {
        dispatch(fetchCartFailure(error));
      });
  };
};

export const addToCartStartAsync = (itemId, cartId) => {
  return dispatch => {
    dispatch(fetchCartStart());
    return axios
      .post(`api/cart-items`, { itemId, cartId })
      .then(() => {
        dispatch(fetchCartStartAsync(cartId));
      })
      .catch(error => {
        dispatch(fetchCartFailure(error));
      });
  };
};

export const fetchCartStartAsync = cartId => {
  return dispatch => {
    dispatch(fetchCartStart());
    return axios
      .get(`api/carts/${cartId}`)
      .then(data => {
        dispatch(fetchCartSuccess(data.data));
      })
      .catch(error => {
        dispatch(fetchCartFailure(error));
      });
  };
};
