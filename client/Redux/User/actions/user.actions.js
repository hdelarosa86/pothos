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

//thunks

export const userLogIn = user => {
  return dispatch => {
    return axios
      .post("/login", user)
      .then(data => {
        console.log('data in action: ', data);
        dispatch(logInUser);
      })
      // .catch(err => {
      //   return err;
      // });
  };
};

// export const userLogIn = user => {
//   return async dispatch => {
//     const loggedInUser = (await axios.post("/login", user)).data;
//     console.log(loggedInUser);
//     return dispatch(logInUser(loggedInUser));
//   };
// };

export const verifyUserCookie = () => {
  return dispatch => {
    axios
      .get("/login/verifyUser")
      .then(data => {
        dispatch(persistUser(data));
      })
      .catch(err => {
        console.error(err);
      });
  };
};

export const userLogOut = () => {
  return dispatch => {
    axios
      .post("/login/deleteCookie")
      .then(() => {
        dispatch(logOutUser(null));
      })
      .catch(err => {
        console.error(err);
      });
  };
};
