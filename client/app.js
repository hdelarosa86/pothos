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

export class App extends React.Component {
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
          <Route exact path={"/login"} render={id => <Login />} />
        </div>
      </div>
    );
  }
}

export default App;
