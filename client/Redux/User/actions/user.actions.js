import userTypes from "../types/user.types";
import axios from "axios";
import INITIAL_STATE from "../reducers/user.reducers";

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

export const updateInUser = user => {
  return dispatch => {
    console.log(user);
    return axios
      .put(`/api/users/${user.id}`, user)
      .then(() => {
        axios.get("/verifyUser").then(user => {
          dispatch(persistUser(user.data));
        });
      })
      .catch(err => {
        console.log(err);
        console.error(err);
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
// userLogOut was pushing null when ever a user logged out
// This created the admin / null issue from before
// I passed the INITIAL_STATE into the logoutUser dispatch
// This fixed the error; however, if you there any issues please advise
export const userLogOut = () => {
  return dispatch => {
    axios
      .post("/logout")
      .then(() => {
        dispatch(logOutUser(INITIAL_STATE));
      })
      .catch(err => {
        console.error(err);
      });
  };
};
