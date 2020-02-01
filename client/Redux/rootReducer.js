import { combineReducers } from "redux";

//Reducers
import itemsReducer from "./Items/reducers/items.reducers";
import userReducer from "./User/reducers/user.reducers";
import orderReducer from "./Order/reducers/order.reducers";
import navReducer from "./Nav/reducers/nav.reducers";

const RootReducer = combineReducers({
  inventory: itemsReducer,
  user: userReducer,
  order: orderReducer,
  nav: navReducer
});

export default RootReducer;
