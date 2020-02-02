import userAdminTypes from "../type/AllUsers.type";

const INITIAL_STATE = {
  isFetching: false,
  errorMessage: "",
  count: 0,
  users: [],
  selectedUsers: {}
};

const allUserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userAdminTypes.FETCH_USER_ADMIN_START:
      return {
        ...state,
        isFetching: true
      };
    case userAdminTypes.FETCH_USER_ADMIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      };
    case userAdminTypes.FETCH_All_USER_ADMIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        users: action.payload
      };
    case userAdminTypes.FETCH_SINGLE_USER_ADMIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        selectedUsers: action.payload
      };
    case userAdminTypes.FETCH_All_USER_ADMIN_BY_PAGE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        users: action.payload.rows,
        count: action.payload.count
      };
    default:
      return state;
  }
};

export default allUserReducer;
