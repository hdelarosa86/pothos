import React from "react";
import "materialize-css/dist/css/materialize.min.css";
import "./app.css";
import { Route, Redirect } from "react-router-dom";
//component
import DetailedItem from "./Components/Items/DetailedItem";
import Home from "./Components/Home";
import Login from "./Components/Users/LogIn";
import NavBar from "./Components/NavBar";
import Cart from "./Components/Cart/Cart";
import Dashboard from "./Components/Users/Dashboard";
import SingleItemUpdate from "./Components/Items/SingleItemUpdate";
import ItemCreate from "./Components/Items/ItemCreate";
import UserUpdate from "./Components/Users/UserUpdate";
import List from "./Components/List/List";
import Footer from "./Components/Footer";
import AdminDashboard from "./Components/Admin/Admin";
import { verifyUserCookie } from "./Redux/User/actions/user.actions";
import {
  fetchOrderBySession,
  fetchOrderStartAsync
} from "./Redux/Order/actions/order.actions";
import { connect } from "react-redux";
import Admin from "./Components/Admin/Admin";

export class App extends React.Component {
  componentDidMount() {
    this.props.persistUser();
    if (document.cookie) {
      this.props.fetchOrder();
    }
  }

  componentDidUpdate(prevState, prevProps) {
    if (prevState.user.loggedIn !== this.props.user.loggedIn) {
      this.props.persistUser();
    }
  }

  render() {
    return (
      <div>
        <main>
          <NavBar />

          <p className="User">
            {!this.props.user.currentUser
              ? "Loading"
              : `Hey ${this.props.user.currentUser.firstName}`}
          </p>
        </main>
        <div class="page-container">
          <Route
            exact
            path={"/"}
            render={() => <Home user={this.props.user} />}
          />
          <Route
            exact
            path={"/shop/pages/:pageId"}
            render={() => (
              <List
                type="items"
                pagination={true}
                filterMethods={["size", "price", null]}
                perPage={6}
              />
            )}
          />
          {/* START OF ADMIN ROUTES */}
          <Route path={"/admin"} render={() => <AdminDashboard />}>
            {!this.props.admin ? <Redirect to="/" /> : null}
          </Route>

          {/* <Route path={"/admin"} component={AdminDashboard} /> */}
          <Route
            exact
            path={"/admin/users/pages/:pageId"}
            render={() => (
              <List
                type="users"
                pagination={true}
                filterMethods={["lastName", "admin", null]}
                perPage={5}
              />
            )}
          />
          <Route
            exact
            path={"/admin/orders/pages/:pageId"}
            render={() => (
              <List
                type="orders"
                pagination={false}
                filterMethods={["checkoutTotal", "status", null]}
                perPage={5}
              />
            )}
          />
          <Route exact path={"/admin/item/create"} component={ItemCreate} />
          <Route
            exact
            path={"/admin/item/pages/:pageId"}
            render={() => (
              <List
                type="items"
                pagination={true}
                filterMethods={["size", "price", null]}
                perPage={6}
                adminBool={true}
              />
            )}
          />
          <Route
            exact
            path={"/admin/item/:id/update"}
            render={id => <SingleItemUpdate Location={id} />}
          />
          <Route
            exact
            path={"/admin/dashboard/:id/update"}
            render={id => <UserUpdate user={this.props.user} location={id} />}
          />
          <Route
            exact
            path={"/admin/shop/:id"}
            render={id => <DetailedItem Location={id} />}
          />
          {/* END OF ADMIN ROUTES */}
          <Route
            exact
            path={"/shop/:id"}
            render={id => <DetailedItem Location={id} />}
          />
          <Route
            exact
            path={"/shop/:id/update"}
            render={id => <SingleItemUpdate Location={id} />}
          />
          <Route exact path={"/cart"} render={() => <Cart />} />
          <Route
            exact
            path={"/dashboard"}
            render={() => <Dashboard assets={this.props} />}
          />
          <Route
            exact
            path={"/dashboard/:id/update"}
            render={id => <UserUpdate user={this.props.user} location={id} />}
          />
          <Route exact path={"/login"} render={props => <Login {...props} />} />
        </div>
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  persistUser: () => dispatch(verifyUserCookie()),
  fetchOrder: () => dispatch(fetchOrderBySession()),
  fetchOrderById: id => dispatch(fetchOrderStartAsync(id))
});

const mapStateToProps = state => ({
  order: state.order,
  user: state.user,
  inventory: state.inventory.items,
  admin: state.user.currentUser.admin
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

// export default App;
