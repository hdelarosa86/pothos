import userTypes from "../types/user.types";

const INITIAL_STATE = {
  currentUser: null
  //// INITIAL STATE object
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.ADD_USER:
      return {
        ...state,
        currentUser: action.payload
      };
    case userTypes.REMOVE_USER:
      return {
        ...state,
        currentUser: null
      };
    default:
      return state;
  }
};

export default userReducer;
