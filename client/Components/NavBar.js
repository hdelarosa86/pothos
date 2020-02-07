import React from "react";
//React-Redux
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userLogOut } from "../Redux/User/actions/user.actions";
import M from "materialize-css";

class NavBar extends React.Component {
  componentDidMount() {
    M.AutoInit();
  }
  render() {
    const loggedInStatus = this.props.user.loggedIn ? "logout" : "login";
    const subNavItems = [
      { id: "home", url: "/" },
      { id: "shop", url: "/shop/pages/1" },
      { id: "cart", url: "/cart" },
      { id: loggedInStatus, url: `${loggedInStatus}` }
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
              <div></div>
              <div></div>
              <div></div>
            </a>
            <ul id="dropdown1" class="dropdown-content">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/shop/pages/1">Shop</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
              <li>
                {this.props.user.loggedIn ? (
                  <div className="admin-user-access">
                    <li>
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/" onClick={this.props.userLogOut}>
                        Logout
                      </Link>
                    </li>
                  </div>
                ) : (
                  <Link to="/login">Login</Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userLogOut: () => dispatch(userLogOut())
  };
};
const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

// {subNavItems.map(secondNavLink => {
//   return (
//     <li key={secondNavLink.id}>
//       <Link to={secondNavLink.url}>{secondNavLink.id}</Link>
//     </li>
//   );
// })}

//might need this later
