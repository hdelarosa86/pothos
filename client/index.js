//React
import React from "react";
import { render } from "react-dom";
//redux
import { Provider } from "react-redux";
//redux store
import Store from "./Redux/store";
//components
import App from "./app";

render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
