import userTypes from "../types/user.types";

const INITIAL_STATE = {
  currentUser: {
    admin: false
  },
  loggedIn: false
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
    case userTypes.LOGIN_USER:
      //console.log('reducer LOGIN_USER: ', action.payload.data);
      return {
        ...state,
        currentUser: action.payload.data
      };
    case userTypes.LOGGED_IN:
      return {
        ...state,
        loggedIn: true
      };

    case userTypes.LOGOUT_USER:
      return {
        ...state,
        currentUser: action.payload,
        loggedIn: false
      };

    case userTypes.PERSIST_USER:
      return {
        ...state,
        currentUser: action.payload,
        loggedIn: action.payload.id === "guest" ? false : true
      };

    default:
      return state;
  }
};

export default userReducer;
