import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import List from "./List/List";

export class Home extends React.Component {
  render() {
    // When users login the signup section will switch to a dashboard section
    const { user } = this.props;
    return (
      <div id="homepage">
        <div className="home-bkgd-img">
          <div className="center-align">
            <h1 className="headline">New on Pothos</h1>
            <div className="call-to-action">
              <h4 className="subhead">Check out all the new plants</h4>
              <Link to="/shop/pages/1">Shop</Link>
            </div>
          </div>
        </div>
        <div className="about">
          <div className="container">
            <div className="row">
              <div className="col s12 m12 l6 left-align">
                <h1 className="about-headline">Welcome To Our New Website</h1>
                <p>
                  To all the plant lover, Pothos now has you covered. We’ve
                  taken some of our favorite plants and cutting the price in
                  half. Because we believe that plants, in all forms, make
                  people happy.
                </p>
              </div>
              <div className="col s12 m12 l6 left-align">
                <span className="about-image">
                  <img
                    className="responsive-img"
                    src="https://i.postimg.cc/nzDYtvQx/ezgif-com-webp-to-jpg-4.png"
                  ></img>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="signup-bkgd-img">
          <div className="container">
            {!user.loggedIn || user === null ? (
              <div className="row">
                <div className="col s12 center-align">
                  <p className="sign-subheader">Get The best from Pothos</p>
                  <h1 className="signup-headline">And Sign Up</h1>
                  <div className="call-to-action">
                    <Link to="/login">Sign Up</Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col s12 center-align">
                  <p className="sign-subheader">Welcome back to Pothos</p>
                  <h1 className="signup-headline">Go to Your Page</h1>
                  <div className="call-to-action">
                    <Link to="/dashboard">Dashboard</Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({});
const mapStateToProps = state => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
