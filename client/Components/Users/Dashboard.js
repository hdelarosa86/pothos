import React from "react";
import { Link } from "react-router-dom";

const UserDashboard = ({ assets }) => {
  // This will be the user dashboard
  // please use this component to make any changes in user profile.
  // Component will display users information on page
  if (assets.user.loggedIn && assets.user.currentUser.email) {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m12 l6 center-align">
            <img
              className="responsive-img"
              src={assets.user.currentUser.imageUrl}
            />
          </div>
          <div className="col s12 m12 l6 center-align">
            <h4>{assets.user.currentUser.firstName}</h4>
            <h4>{assets.user.currentUser.lastName}</h4>
            <h6>{assets.user.currentUser.email}</h6>
            <Link to={`/dashboard/${assets.user.currentUser.id}/update`}>
              Edit Profile
            </Link>
            {assets.user.currentUser.admin && (
              <Link to={"/admin"}>Admin Dashboard</Link>
            )}
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
