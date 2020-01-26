import cartTypes from "../types/cart.types";
import { addItemToCart, removeItemFromCart } from "../utils/cart.utils";

const INITIAL_STATE = {
  isFetching: false,
  errorMessage: "",
  cartContent: {
    CartItem: []
  }
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartTypes.FETCH_CART_START:
      return {
        ...state,
        isFetching: true
      };
    case cartTypes.FETCH_CART_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      };
    case cartTypes.FETCH_CART_SUCCESS:
      return {
        ...state,
        isFetching: false,
        cartContent: action.payload
      };
    default:
      return state;
  }
};

export default cartReducer;
