import { combineReducers } from "redux";

//Reducers
import itemsReducer from "./Items/reducers/items.reducers";
import userReducer from "./User/reducers/user.reducers";
import orderReducer from "./Order/reducers/order.reducers";
import navReducer from "./Nav/reducers/nav.reducers";
import allOrderReducer from "./AllOrders/reducer/AllOrders.reducer";
import allUserReducer from "./AllUsers/reducer/AllUsers.reducer";

const RootReducer = combineReducers({
  inventory: itemsReducer,
  user: userReducer,
  order: orderReducer,
  nav: navReducer,
  allOrders: allOrderReducer,
  allUsers: allUserReducer
});

export default RootReducer;
