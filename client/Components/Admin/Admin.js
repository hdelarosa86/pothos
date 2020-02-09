import React from "react";
// import "materialize-css/dist/css/materialize.min.css";
// import "./app.css";
import { Route } from "react-router-dom";
//component
// import AllItems from "./Components/Items/AllItems";
// import DetailedItem from "./Components/Items/DetailedItem";
// import Home from "./Components/Home";
// import Login from "./Components/Users/LogIn";
// import NavBar from "./Components/NavBar";
// import Cart from "./Components/Cart/Cart";
// import Checkout from "./Components/Cart/Checkout";
// import Dashboard from "./Components/Users/Dashboard";
// import SingleItemUpdate from "./Components/Items/SingleItemUpdate";
// import UserUpdate from "./Components/Users/UserUpdate";
import List from "../List/List";
// import Footer from "./Components/Footer";
// import { verifyUserCookie } from "./Redux/User/actions/user.actions";
import { connect } from "react-redux";
import { Link, Switch } from "react-router-dom";

class AdminDashboard extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {}
  componentDidUpdate() {}

  render() {
    return (
      <div className="filter">
        <div className="row">
          <div className="col s12 m12 l12 center-align">
            <h2>Hello Admin</h2>
            <Link to="/admin/users/pages/1">
              <button>Users</button>
            </Link>
            <Link to="/admin/item/pages/1">
              <button>Items</button>
            </Link>
            <Link to="/admin/orders/pages/1">
              <button>Orders</button>
            </Link>
            <Link to="/admin/item/create">
              <button>Create Item</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  persistUser: () => dispatch(verifyUserCookie())
});

const mapStateToProps = state => ({
  order: state.order.orderContent,
  user: state.user,
  inventory: state.inventory.items
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
