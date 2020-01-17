import itemTypes from "../types/items.types";
//not sure if we want the isFetching to be global

const INITIAL_STATE = {
  isFetching: false,
  errorMessage: "",
  items: []
  // INITIAL STATE object
};

const itemsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case itemTypes.FETCH_START:
      return {
        ...state,
        isFetching: true
      };
    case itemTypes.FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: action.payload
      };
    case itemTypes.FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};

export default itemsReducer;
