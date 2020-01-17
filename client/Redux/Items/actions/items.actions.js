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
    //  return axios api call to fetch all items
    // .then((data)=>{
    //     dispatch(itemFetchSuccess(data))
    // })
    // .catch((error)=>{
    //     dispatch(itemFetchFailure(error))
    // })
  };
};
