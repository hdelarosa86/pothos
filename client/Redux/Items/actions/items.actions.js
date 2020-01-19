import itemTypes from "../types/items.types";
import axios from "axios";

//actions

export const itemFetchStart = () => ({
  type: itemTypes.FETCH_START
});

export const itemFetchSuccess = data => ({
  type: itemTypes.FETCH_SUCCESS,
  payload: data
});

export const itemFetchFailure = error => ({
  type: itemTypes.FETCH_FAILURE,
  payload: error
});

//thunk

export const itemsFetchStartAsync = () => {
  return dispatch => {
    dispatch(itemFetchStart());
    return axios
      .get("/api/items/")
      .then(data => {
        dispatch(itemFetchSuccess(data.data));
      })
      .catch(error => {
        dispatch(itemFetchFailure(error));
      });
  };
};

export const createItemThenFetch = item => {
  return dispatch => {
    return axios
      .post("/api/items/", item)
      .then(() => {
        dispatch(itemsFetchStartAsync());
      })
      .catch(error => {
        dispatch(itemFetchFailure(error));
      });
  };
};

export const updateItemThenFetch = item => {
  return dispatch => {
    return axios
      .put(`/api/items/${item.id}`, item)
      .then(() => {
        dispatch(itemsFetchStartAsync());
      })
      .catch(error => {
        dispatch(itemFetchFailure(error));
      });
  };
};

export const deleteItemThenFetch = id => {
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
