import cartTypes from "../types/cart.types";
import { addItemToCart, removeItemFromCart } from "../utils/cart.utils";

const INITIAL_STATE = {
  isFetching: false,
  errorMessage: "",
  cartContent: {
    CartItem: []
  }
  // INITIAL STATE object
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartTypes.ADD_ITEM:
      return {
        ...state,
        cartContent: addItemToCart(state.cartContent, action.payload)
      };
    case cartTypes.REMOVE_ITEM:
      return {
        ...state,
        cartContent: removeItemFromCart(state.cartContent, action.payload)
      };
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
