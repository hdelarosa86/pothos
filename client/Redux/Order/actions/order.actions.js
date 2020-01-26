import orderTypes from "../types/order.types";
import axios from "axios";

export const fetchOrderStart = () => ({
  type: orderTypes.FETCH_CART_START
});

export const fetchOrderFailure = error => ({
  type: orderTypes.FETCH_ORDER_FAILURE,
  payload: error
});

export const fetchOrderSuccess = data => ({
  type: orderTypes.FETCH_ORDER_SUCCESS,
  payload: data
});

//Thunks

export const incrementItemStartAsync = (cartItemId, orderId) => {
  return dispatch => {
    dispatch(fetchOrderStart());
    return axios
      .put(`api/cart-items/${cartItemId}/increment/`)
      .then(() => {
        dispatch(fetchOrderStartAsync(orderId));
      })
      .catch(error => {
        dispatch(fetchOrderFailure(error));
      });
  };
};

export const decrementItemStartAsync = (cartItemId, orderId) => {
  return dispatch => {
    dispatch(fetchOrderStart());
    return axios
      .put(`api/cart-items/${cartItemId}/decrement/`)
      .then(() => {
        dispatch(fetchOrderStartAsync(orderId));
      })
      .catch(error => {
        dispatch(fetchOrderailure(error));
      });
  };
};

export const addToOrderStartAsync = (itemId, orderId) => {
  return dispatch => {
    dispatch(fetchOrderStart());
    return axios
      .post(`api/cart-items`, { itemId, orderId })
      .then(() => {
        dispatch(fetchOrderStartAsync(orderId));
      })
      .catch(error => {
        dispatch(fetchOrderFailure(error));
      });
  };
};

export const fetchOrderStartAsync = orderId => {
  return dispatch => {
    dispatch(fetchOrderStart());
    return axios
      .get(`api/orders/${orderId}`)
      .then(data => {
        dispatch(fetchOrderSuccess(data.data));
      })
      .catch(error => {
        dispatch(fetchOrderFailure(error));
      });
  };
};
