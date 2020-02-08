import userAdminTypes from "../type/AllUsers.type";
import axios from "axios";

//actions

export const userAdminFetchStart = () => ({
  type: userAdminTypes.FETCH_USER_ADMIN_START
});

export const userAdminFetchFailure = error => ({
  type: userAdminTypes.FETCH_USER_ADMIN_FAILURE,
  payload: error
});

export const userAdminSingleFetchSuccess = data => ({
  type: userAdminTypes.FETCH_SINGLE_USER_ADMIN_SUCCESS,
  payload: data
});

export const userAdminAllFetchSuccess = data => ({
  type: userAdminTypes.FETCH_All_USER_ADMIN_SUCCESS,
  payload: data
});

export const userAdminAllByPageFetchSuccess = data => ({
  type: userAdminTypes.FETCH_All_USER_ADMIN_BY_PAGE_SUCCESS,
  payload: data
});

//thunk

export const singleUserAdminFetchStartAsync = id => {
  return dispatch => {
    dispatch(userAdminFetchStart());

    return axios
      .get(`/api/users/${id}`)
      .then(data => {
        dispatch(userAdminSingleFetchSuccess(data.data));
      })
      .catch(error => {
        dispatch(userAdminFetchFailure(error));
      });
  };
};

export const allUserAdminFetchStartAsync = (perPage, page, filter) => {
  const arg = [
    ["page", page],
    ["perPage", perPage],
    ["filter", filter]
  ];
  const query = arg.reduce((acc, [key, value], idx) => {
    acc += `${key}=${value}`;
    if (idx !== arg.length - 1) {
      acc += "&";
    }
    return acc;
  }, "?");
  return dispatch => {
    dispatch(userAdminFetchStart());
    return axios
      .get(`/api/users/${query}`)
      .then(data => {
        if (page) {
          dispatch(userAdminAllByPageFetchSuccess(data.data));
        } else {
          dispatch(userAdminAllFetchSuccess(data.data));
        }
      })
      .catch(error => {
        dispatch(userAdminFetchFailure(error));
      });
  };
};

export const createUserAdminThenFetchAll = item => {
  return dispatch => {
    return axios
      .post("/api/users/", item)
      .then(() => {
        dispatch(allUserAdminFetchStartAsync());
      })
      .catch(error => {
        dispatch(userAdminFetchFailure(error));
      });
  };
};

export const updateUserAdminThenFetchAll = item => {
  return dispatch => {
    return axios
      .put(`/api/users/${item.id}`, item)
      .then(() => {
        dispatch(allUserAdminFetchStartAsync());
      })
      .catch(error => {
        dispatch(userAdminFetchFailure(error));
      });
  };
};

export const deleteUserAdminThenFetchAll = id => {
  return dispatch => {
    return axios
      .delete(`/api/users/${id}`)
      .then(() => {
        dispatch(allUserAdminFetchStartAsync());
      })
      .catch(error => {
        dispatch(userAdminFetchFailure(error));
      });
  };
};
