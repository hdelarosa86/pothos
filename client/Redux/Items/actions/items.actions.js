import itemTypes from "../types/items.types";
import axios from "axios";

//actions
//need a selected item

export const itemFetchStart = () => ({
  type: itemTypes.FETCH_ITEM_START
});

export const itemAllFetchSuccess = data => ({
  type: itemTypes.FETCH_All_ITEM_SUCCESS,
  payload: data
});

export const itemAllByPageFetchSuccess = data => ({
  type: itemTypes.FETCH_All_ITEM_BY_PAGE_SUCCESS,
  payload: data
});

export const itemSingleFetchSuccess = data => ({
  type: itemTypes.FETCH_SINGLE_ITEM_SUCCESS,
  payload: data
});

export const itemFetchFailure = error => ({
  type: itemTypes.FETCH_ITEM_FAILURE,
  payload: error
});

//thunk

export const singleItemFetchStartAsync = id => {
  return dispatch => {
    dispatch(itemFetchStart());
    return axios
      .get(`/api/items/${id}`)
      .then(data => {
        dispatch(itemSingleFetchSuccess(data.data));
      })
      .catch(error => {
        dispatch(itemFetchFailure(error));
      });
  };
};

export const allItemsFetchStartAsync = (perPage, page, filter) => {
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
    dispatch(itemFetchStart());
    return axios
      .get(`/api/items/${query}`)
      .then(data => {
        if (page) {
          dispatch(itemAllByPageFetchSuccess(data.data));
        } else {
          dispatch(itemAllFetchSuccess(data.data));
        }
      })
      .catch(error => {
        dispatch(itemFetchFailure(error));
      });
  };
};

export const createItemThenFetchAll = item => {
  return dispatch => {
    return axios
      .post("/api/items/", item)
      .then(() => {
        dispatch(allItemsFetchStartAsync());
      })
      .catch(error => {
        dispatch(itemFetchFailure(error));
      });
  };
};

export const updateItemThenFetchAll = item => {
  return dispatch => {
    return axios
      .put(`/api/items/${item.id}`, item)
      .then(() => {
        dispatch(allItemsFetchStartAsync());
      })
      .catch(error => {
        dispatch(itemFetchFailure(error));
      });
  };
};

export const deleteItemThenFetchAll = id => {
  return dispatch => {
    return axios
      .delete(`/api/items/${id}`)
      .then(() => {
        dispatch(itemsFetchStartAsync());
      })
      .catch(error => {
        dispatch(itemFetchFailure(error));
      });
  };
};
