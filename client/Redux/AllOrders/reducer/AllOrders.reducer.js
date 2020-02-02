import orderAdminTypes from "../type/AllOrders.type";

const INITIAL_STATE = {
  isFetching: false,
  errorMessage: "",
  count: 0,
  orders: [],
  selectedOrder: {}
  // INITIAL STATE object
};

const allOrderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case orderAdminTypes.FETCH_ORDER_ADMIN_START:
      return {
        ...state,
        isFetching: true
      };
    case orderAdminTypes.FETCH_ORDER_ADMIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      };
    case orderAdminTypes.FETCH_All_ORDER_ADMIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        orders: action.payload
      };
    case orderAdminTypes.FETCH_SINGLE_ORDER_ADMIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        selectedOrder: action.payload
      };
    case orderAdminTypes.FETCH_All_ORDER_ADMIN_BY_PAGE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        orders: action.payload.rows,
        count: action.payload.count
      };
    default:
      return state;
  }
};

export default allOrderReducer;
