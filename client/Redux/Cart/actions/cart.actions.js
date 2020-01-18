import cartTypes from "../types/cart.types";

export const addItem = item => ({
  type: cartTypes.ADD_ITEM,
  payload: item
});

export const removeItem = item => ({
  type: cartTypes.REMOVE_ITEM,
  payload: item
});
