import orderTypes from "../types/order.types";
import { addItemToOrder, removeItemFromOrder } from "../utils/order.utils";

const INITIAL_STATE = {
  isFetching: false,
  errorMessage: "",
  orderInfo: { CartItems: [] },
  orderHistory: []
};

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case orderTypes.FETCH_ORDER_START:
      return {
        ...state,
        isFetching: true
      };
    case orderTypes.FETCH_ORDER_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      };
    case orderTypes.FETCH_ORDER_INFO_SUCCESS:
      return {
        ...state,
        errorMessage: "",
        isFetching: false,
        orderInfo: action.payload
      };
    case orderTypes.FETCH_ORDER_SUCCESS:
      return {
        ...state,
        errorMessage: "",
        isFetching: false,
        orderInfo: action.payload
      };
    case orderTypes.FETCH_ORDER_HISTORY:
      return {
        ...state,
        errorMessage: "",
        isFetching: false,
        orderHistory: action.payload
      };
    default:
      return state;
  }
};

export default orderReducer;
