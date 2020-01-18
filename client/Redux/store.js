import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

//import Root Reducer
import RootReducer from "./rootReducer";

let middleWare = [thunk];
// Only console.log in browser and not in mocha test
if (process.browser) {
  middleWare = [...middleWare, createLogger({ collapsed: true })];
}
// Reset store, this will help reset store in mocha test
const RESET = "RESET";
export const resetStore = () => ({ type: RESET });
const appReducer = (state, action) => {
  if (action.type === RESET) {
    state = undefined;
    return RootReducer(state, action);
  }
  return RootReducer(state, action);
};

const Store = createStore(appReducer, applyMiddleware(...middleWare));

export default Store;
