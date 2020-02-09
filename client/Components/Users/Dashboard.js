import React from "react";
import { Link } from "react-router-dom";
import OrderHistory from "./OrderHistory";

const UserDashboard = ({ assets }) => {
  // This will be the user dashboard
  // please use this component to make any changes in user profile.
  // Component will display users information on page
  if (assets.user.loggedIn && assets.user.currentUser.email) {
    return (
      <div>
        <div className="container">
          <div className="dashboard">
            <div className="row">
              <div className="col s12 m12 l6 center-align">
                <img
                  className="responsive-img"
                  src={assets.user.currentUser.imageUrl}
                />
              </div>
              <div className="col s12 m12 l6 left-align">
                <h6 className="name-label">FULLNAME</h6>
                <h4 className="fullname">
                  {assets.user.currentUser.firstName}{" "}
                  {assets.user.currentUser.lastName}
                </h4>
                <h6 className="email-label">EMAIL</h6>
                <h6>{assets.user.currentUser.email}</h6>
                <div className="filter">
                  <Link to={`/dashboard/${assets.user.currentUser.id}/update`}>
                    <button>Edit Profile</button>
                  </Link>
                  {assets.user.currentUser.admin && (
                    <Link to={"/admin/users/pages/1"}>
                      <button>Admin Dashboard</button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <OrderHistory />
          </div>
        </div>
        <div className="dashboard-bkgd-img">
          <div className="dashboard-bkgd-overlay"></div>
          <div className="container">
            <div className="row">
              <div className="col s12 center-align">
                <p className="dashboard-subheader">
                  Find the Plant Right For You
                </p>
                <h1 className="dashboard-headline">Shop Now</h1>
                <div className="call-to-action">
                  <Link to="/shop/pages/1">Shop</Link>
                </div>
              </div>
            </div>
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
