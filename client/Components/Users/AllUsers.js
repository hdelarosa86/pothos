import React from "react";

const AllUsers = ({ user }) => {
  console.log(user);
  return (
    <div className="admin-user">
      <div className="row">
        <div className="col s12 m12 l4 left-align">
          <img className={"responsive-img"} src={user.imageUrl} />
        </div>
        <div className="col s12 m12 l8 left-align">
          <strong>Fullname</strong>
          {user.firstName} {user.lastName}
          <br />
          <strong>Email</strong>
          {user.email}
          <br />
          <strong>Id</strong>
          {`${user.id}`}
          <br />
          <strong>Admin</strong>
          {`${user.admin}`}
          <br />
          <br />
          <button className="edit">Edit</button>
          <br />
          <button className="delete">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
