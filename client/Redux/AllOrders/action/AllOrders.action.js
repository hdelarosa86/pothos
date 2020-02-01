import orderAdminTypes from "../type/AllOrders.type";
import axios from "axios";

//actions
//need a selected item

export const orderAdminFetchStart = () => ({
  type: orderAdminTypes.FETCH_ORDER_ADMIN_START
});

export const orderAdminFetchFailure = error => ({
  type: orderAdminTypes.FETCH_ORDER_ADMIN_FAILURE,
  payload: error
});

export const orderAdminSingleFetchSuccess = data => ({
  type: orderAdminTypes.FETCH_SINGLE_ORDER_ADMIN_SUCCESS,
  payload: data
});

export const orderAdminAllFetchSuccess = data => ({
  type: orderAdminTypes.FETCH_All_ORDER_ADMIN_SUCCESS,
  payload: data
});

export const orderAdminAllByPageFetchSuccess = data => ({
  type: orderAdminTypes.FETCH_All_ORDER_ADMIN_BY_PAGE_SUCCESS,
  payload: data
});

//thunk

export const singleOrderAdminFetchStartAsync = id => {
  return dispatch => {
    dispatch(orderAdminFetchStart());
    return axios
      .get(`/api/orders/${id}`)
      .then(data => {
        dispatch(orderAdminSingleFetchSuccess(data.data));
      })
      .catch(error => {
        dispatch(orderAdminFetchFailure(error));
      });
  };
};

export const allOrderAdminFetchStartAsync = (perPage, page, filter) => {
  const arg = [
    ["page", page],
    ["perPage", perPage],
    ["filter", filter]
  ];
  const query = arg.reduce((acc, [key, value], idx) => {
    acc += `${key}=${value}`;
    if (idx !== arg.length - 1) {
      acc += "&";
    }
    return acc;
  }, "?");
  return dispatch => {
    dispatch(orderAdminFetchStart());
    return axios
      .get(`/api/orders/${query}`)
      .then(data => {
        if (page) {
          dispatch(orderAdminAllByPageFetchSuccess(data.data));
        } else {
          dispatch(orderAdminAllFetchSuccess(data.data));
        }
      })
      .catch(error => {
        dispatch(orderAdminFetchFailure(error));
      });
  };
};

export const createItemThenFetchAll = item => {
  return dispatch => {
    return axios
      .post("/api/orders/", item)
      .then(() => {
        dispatch(allOrderAdminFetchStartAsync());
      })
      .catch(error => {
        dispatch(orderAdminFetchFailure(error));
      });
  };
};

export const updateItemThenFetchAll = item => {
  return dispatch => {
    return axios
      .put(`/api/orders/${item.id}`, item)
      .then(() => {
        dispatch(allOrderAdminFetchStartAsync());
      })
      .catch(error => {
        dispatch(orderAdminFetchFailure(error));
      });
  };
};

export const deleteItemThenFetchAll = id => {
  return dispatch => {
    return axios
      .delete(`/api/orders/${id}`)
      .then(() => {
        dispatch(allOrderAdminFetchStartAsync());
      })
      .catch(error => {
        dispatch(orderAdminFetchFailure(error));
      });
  };
};
