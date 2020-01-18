import React from "react";
import "./app.css";
//component
import ReduxTestComponent from "./Components/ReduxTestComponent/ReduxTextComponent";

export class App extends React.Component {
  render() {
    return (
      <div class="container">
        <ReduxTestComponent />
      </div>
    );
  }
}

export default App;
