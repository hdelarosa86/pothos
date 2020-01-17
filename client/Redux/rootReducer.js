import { combineReducers } from "redux";

//Reducers
import itemsReducer from "./Items/reducers/items.reducers";
import userReducer from "./User/reducers/user.reducers";
import cartReducer from "./Cart/reducers/cart.reducers";

const RootReducer = combineReducers({
  inventory: itemsReducer,
  user: userReducer,
  cart: cartReducer
  //not sure if we need a NAV reducer
});

export default RootReducer;
