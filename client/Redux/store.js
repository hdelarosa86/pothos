import { createStore, applyMiddleware } from "redux";
import { logger } from "redux-logger";
import thunk from "redux-thunk";

//import Root Reducer
import RootReducer from "./rootReducer";

const middleWare = [logger, thunk];

const Store = createStore(RootReducer, applyMiddleware(...middleWare));

export default Store;
