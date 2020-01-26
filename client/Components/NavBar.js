import React from "react";
//React-Redux
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import M from "materialize-css";

class NavBar extends React.Component {
  componentDidMount() {
    M.AutoInit();
  }
  render() {
    const subNavItems = [
      { id: "home", url: "/" },
      { id: "shop", url: "/shop" },
      { id: "cart", url: "/cart" },
      { id: "login", url: "/login" }
    ];
    return (
      <nav className="pothos-nav">
        <div className="row">
          <div className="col s3">
            <div className="logo">
              <Link to="/">
                <img src="https://i.postimg.cc/HxDNcTyj/pothos-02.png"></img>
              </Link>
            </div>
          </div>
          <div className="col s9">
            <a className="dropdown-trigger btn" data-target="dropdown1">
              &#709;
            </a>
            <ul id="dropdown1" class="dropdown-content">
              {subNavItems.map(secondNavLink => {
                return (
                  <li key={secondNavLink.id}>
                    <Link to={secondNavLink.url}>{secondNavLink.id}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapDispatchToProps = dispatch => ({});
const mapStateToProps = state => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
