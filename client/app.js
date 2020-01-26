import React from "react";
import "./app.css";
import { Route } from "react-router-dom";
//component
import AllItems from "./Components/Items/AllItems";
import DetailedItem from "./Components/Items/DetailedItem";
import Home from "./Components/Home";
import Login from "./Components/Users/LogIn";
import NavBar from "./Components/NavBar";
import Cart from "./Components/Cart/Cart";
import Checkout from "./Components/Cart/Checkout";
import "materialize-css/dist/css/materialize.min.css";
import { verifyUserCookie } from "./Redux/User/actions/user.actions";
import { connect } from "react-redux";

export class App extends React.Component {
  componentDidMount() {
   this.props.persistUser();
  }
  render() {
    return (
      <div>
        <main>
          <NavBar />
        </main>
        <div class="col s12">
          <Route exact path={"/"} render={() => <Home />} />
          <Route exact path={"/shop"} render={() => <AllItems />} />
          <Route
            path={"/shop/:id"}
            render={id => <DetailedItem Location={id} />}
          />
          <Route exact path={"/cart"} render={() => <Cart />} />
          <Route
            exact
            path={"/cart/:id"}
            render={id => <Checkout Location={id} />}
          />
          <Route exact path={"/login"} render={props => <Login {...props} />} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  persistUser: () => dispatch(verifyUserCookie())
});

const mapStateToProps = state => ({
  cart: state.cart.cartContent,
  user: state.user,
  inventory: state.inventory.items
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

// export default App;
