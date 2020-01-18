import cartTypes from "../types/cart.types";
import { addItemToCart, removeItemFromCart } from "../utils/cart.utils";

const INITIAL_STATE = {
  cartContent: []
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
    default:
      return state;
  }
};

export default cartReducer;
