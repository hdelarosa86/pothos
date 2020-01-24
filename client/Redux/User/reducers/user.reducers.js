import userTypes from "../types/user.types";

const INITIAL_STATE = {
  currentUser: null,
  //// INITIAL STATE object
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.ADD_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case userTypes.REMOVE_USER:
      return {
        ...state,
        currentUser: null,
      };
    case userTypes.LOGIN_USER:
      return {
        ...state,
        currentUser: action.payload,
      };

      case userTypes.LOGOUT_USER:
        return {
          ...state,
          currentUser: action.payload,
        };

    case userTypes.PERSIST_USER:
      return {
        ...state,
        currentUser: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
