import itemTypes from "../types/items.types";
//not sure if we want the isFetching to be global

const INITIAL_STATE = {
  isFetching: false,
  errorMessage: "",
  count: 0,
  items: [],
  selectedItem: {}
  // INITIAL STATE object
};

const itemsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case itemTypes.FETCH_ITEM_START:
      return {
        ...state,
        isFetching: true
      };
    case itemTypes.FETCH_ITEM_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      };
    case itemTypes.FETCH_All_ITEM_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: action.payload
      };
    case itemTypes.FETCH_SINGLE_ITEM_SUCCESS:
      return {
        ...state,
        isFetching: false,
        selectedItem: action.payload
      };
    case itemTypes.FETCH_All_ITEM_BY_PAGE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: action.payload.rows,
        count: action.payload.count
      };
    default:
      return state;
  }
};

export default itemsReducer;
