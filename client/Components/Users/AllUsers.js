import React from "react";

const AllUsers = ({ user }) => {
  console.log(user);
  return (
    <div>
      <span>
        <img src={user.imageUrl} />
      </span>
      <span>Id: {user.id}</span>
      <span>First Name: {user.firstName}</span>
      <span>Last Name: {user.lastName}</span>
      <span>Email: {user.email}</span>
      <span>admin: {`${user.admin}`}</span>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
};

export default AllUsers;
