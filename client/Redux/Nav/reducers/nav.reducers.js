import navType from "../types/nav.types";
import navTypes from "../types/nav.types";

const INITIAL_STATE = {
  filter: null
};

const navReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case navTypes.SELECT_FILTER:
      return {
        ...state,
        filter: action.payload
      };
    default:
      return state;
  }
};

export default navReducer;
