import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Cart extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>Where Cart Lives</h1>
        <button className="checkout btn">
          <Link to="/cart/1">Checkout</Link>
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({});
const mapStateToProps = state => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
