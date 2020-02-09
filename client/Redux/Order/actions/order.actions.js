import orderTypes from "../types/order.types";
import axios from "axios";

export const fetchOrderStart = () => ({
  type: orderTypes.FETCH_ORDER_START
});

export const fetchOrderFailure = error => ({
  type: orderTypes.FETCH_ORDER_FAILURE,
  payload: error
});

export const fetchOrderSuccess = data => ({
  type: orderTypes.FETCH_ORDER_SUCCESS,
  payload: data
});
export const fetchOrderInfoSuccess = data => ({
  type: orderTypes.FETCH_ORDER_INFO_SUCCESS,
  payload: data
});
export const fetchOrderHistory = data => ({
  type: orderTypes.FETCH_ORDER_HISTORY,
  payload: data
});

//Thunks

export const incrementItemStartAsync = (cartItemId, orderId, price) => {
  return dispatch => {
    dispatch(fetchOrderStart());
    return axios
      .put(`api/cart-items/${cartItemId}/increment/`, { price })
      .then(() => {
        dispatch(fetchOrderStartAsync(orderId));
      })
      .catch(error => {
        dispatch(fetchOrderFailure(error));
      });
  };
};

export const decrementItemStartAsync = (cartItemId, orderId, price) => {
  return dispatch => {
    dispatch(fetchOrderStart());
    return axios
      .put(`api/cart-items/${cartItemId}/decrement/`, { price })
      .then(() => {
        dispatch(fetchOrderStartAsync(orderId));
      })
      .catch(error => {
        dispatch(fetchOrderailure(error));
      });
  };
};

export const addToOrderStartAsync = (itemId, orderId, itemTotal) => {
  return dispatch => {
    dispatch(fetchOrderStart());
    return axios
      .post(`/api/cart-items/`, {
        itemId: itemId,
        orderId: orderId,
        itemTotal: itemTotal
      })
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

export const fetchOrderBySession = () => {
  return dispatch => {
    return axios
      .get(`/api/orders/session`)
      .then(data => {
        dispatch(fetchOrderInfoSuccess(data.data));
      })
      .catch(error => {
        dispatch(fetchOrderFailure(error));
      });
  };
};

export const updateOrderTotal = (orderId, checkoutTotal) => {
  return dispatch => {
    dispatch(fetchOrderStart());
    return axios
      .put(`/api/orders/${orderId}`, { checkoutTotal })
      .then(() => {
        dispatch(fetchOrderStartAsync(orderId));
      })
      .catch(error => {
        dispatch(fetchOrderFailure(error));
      });
  };
};

export const markOrdercheckedOut = orderId => {
  return dispatch => {
    return axios
      .put(`/api/orders/${orderId}/complete`, { status: "checkedOut" })
      .then(res => {
        dispatch(fetchOrderInfoSuccess(res.data));
      })
      .catch(error => {
        dispatch(fetchOrderFailure(error));
      });
  };
};

export const fetchOrderByUser = userId => {
  return dispatch => {
    return axios
      .get(`/api/orders/user/${userId}`)
      .then(data => {
        dispatch(fetchOrderHistory(data.data));
      })
      .catch(error => {
        dispatch(fetchOrderFailure(error));
      });
  };
};
