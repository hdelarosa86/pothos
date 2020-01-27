import { combineReducers } from "redux";

//Reducers
import itemsReducer from "./Items/reducers/items.reducers";
import userReducer from "./User/reducers/user.reducers";
import orderReducer from "./Order/reducers/order.reducers";

const RootReducer = combineReducers({
  inventory: itemsReducer,
  user: userReducer,
  order: orderReducer
  //not sure if we need a NAV reducer
});

export default RootReducer;
