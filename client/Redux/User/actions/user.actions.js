import userTypes from "../types/user.types";
import axios from "axios";

export const addUser = user => ({
  type: userTypes.ADD_USER,
  payload: user,
});

export const removeUser = () => ({
  type: userTypes.REMOVE_USER,
});

export const logInUser = user => ({
  type: userTypes.LOGIN_USER,
  payload: user,
});

export const persistUser = user => ({
  type: userTypes.PERSIST_USER,
  payload: user,
});

export const logOutUser = user => ({
  type: userTypes.LOGOUT_USER,
  payload: user,
});

//thunks

export const userLogIn = user => {
  return async dispatch => {
    const loggedInUser = (await axios.post("/login", user)).data;
    return dispatch(logInUser(loggedInUser));
  };
};

export const verifyUserCookie = () => {
  return async dispatch => {
    const verifiedUser = (await axios.get("/login/verifyUser")).data;
    return dispatch(persistUser(verifiedUser));
  };
};

export const userLogOut = () => {
  return async dispatch => {
    await axios.post("/login/deleteCookie");
    return dispatch(logOutUser(null))
  };
};
