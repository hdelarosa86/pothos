import React from "react";
import { render } from "react-dom";
//redux
import { Provider } from "react-redux";
//redux store
import Store from "./Redux/store";
//components
import App from "./app";
import { HashRouter, Switch } from "react-router-dom";

render(
  <Provider store={Store}>
    <HashRouter>
      <Switch>
        <App />
      </Switch>
    </HashRouter>
  </Provider>,
  document.querySelector("#root")
);
