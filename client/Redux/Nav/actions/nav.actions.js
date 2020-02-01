import navTypes from "../types/nav.types";

//actions
export const selectFilter = filter => ({
  type: navTypes.SELECT_FILTER,
  payload: filter
});
