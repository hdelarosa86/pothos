import cartTypes from "../types/cart.types";
import { addItemToCart, removeItemFromCart } from "../utils/cart.utils";

const INITIAL_STATE = {
  cartContent: [
    {
      id: 1,
      name: "bubblegum",
      price: 4,
      quantity: 1
    },
    {
      id: 2,
      name: "pencil",
      price: 1,
      quantity: 1
    }
  ]
  // INITIAL STATE object -- content in CartContent for testing purposes only
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
