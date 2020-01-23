import React from "react";
import "./app.css";
//component
import ReduxTestComponent from "./Components/ReduxTestComponent/ReduxTextComponent";
import AllItems from "./Components/AllItems";

export class App extends React.Component {
  render() {
    return (
      <div class="container">
        <ReduxTestComponent />
        <div>All Items!!</div>
        <AllItems />
      </div>
    );
  }
}

export default App;
