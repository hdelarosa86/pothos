import React from "react";
import { connect } from "react-redux";

class Checkout extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>Where Checkout Lives</h1>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({});
const mapStateToProps = state => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
