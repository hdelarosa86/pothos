import userTypes from "../types/user.types";
import axios from "axios";

//actions

export const addUser = user => ({
  type: userTypes.ADD_USER,
  payload: user
});

export const removeUser = () => ({
  type: userTypes.REMOVE_USER
});

export const logInUser = user => ({
  type: userTypes.LOGIN_USER,
  payload: user
});

export const persistUser = user => ({
  type: userTypes.PERSIST_USER,
  payload: user
});

export const logOutUser = user => ({
  type: userTypes.LOGOUT_USER,
  payload: user
});

export const loggedIn = () => ({
  type: userTypes.LOGGED_IN
});

//thunks

export const userLogIn = user => {
  return dispatch => {
    return axios.post("/login", user).then(data => {
      dispatch(logInUser(data));
      dispatch(loggedIn());
    });
  };
};
// Adds a new user to the site and makes them the current user
export const addInUser = user => {
  return dispatch => {
    return axios.post("/api/users/", user).then(() => {
      return axios.post("/login", user).then(result => {
        dispatch(addUser(result));
        dispatch(logInUser(result));
        dispatch(loggedIn());
      });
    });
  };
};

export const verifyUserCookie = () => {
  return dispatch => {
    axios
      .get("/verifyUser")
      .then(user => {
        dispatch(persistUser(user.data));
      })
      .catch(err => {
        console.log(err);
        console.error(err);
      });
  };
};

export const userLogOut = () => {
  return dispatch => {
    axios
      .post("/logout")
      .then(() => {
        dispatch(logOutUser(null));
      })
      .catch(err => {
        console.error(err);
      });
  };
};
