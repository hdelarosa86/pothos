import React from "react";
import { connect } from "react-redux";
import { allUserAdminFetchStartAsync } from "../../Redux/AllUsers/action/AllUsers.action";

const AllUsers = ({ user }) => {
    console.log(user);
  return (
    <div>
      <span>{user.id}</span>
      <span>{user.firstName}</span>
      <span>{user.lastName}</span>
      <span>{user.email}</span>
      <span>{`${user.admin}`}</span>
    </div>
  );
};

export default AllUsers;
