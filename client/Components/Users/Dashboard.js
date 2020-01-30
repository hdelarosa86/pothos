import React from "react";

const UserDashboard = ({ assets }) => {
  // This will be the user dashboard
  // please use this component to make any changes in user profile.
  // Component will display users information on page
  if (assets.user.loggedIn && assets.user.currentUser.email) {
    return (
      <div className="container">
        <div className="row">
          <div className="col s6 center-align">
            <img src={assets.user.currentUser.imageUrl} />
          </div>
          <div className="col s6 center-align">
            <h4>{assets.user.currentUser.firstName}</h4>
            <h4>{assets.user.currentUser.lastName}</h4>
            <h4>{assets.user.currentUser.username}</h4>
            <h6>{assets.user.currentUser.email}</h6>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      <h1>Not Authorized</h1>
    </div>
  );
};

export default UserDashboard;
