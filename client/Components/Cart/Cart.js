import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOrderBySession } from "../../Redux/Order/actions/order.actions"

class Cart extends React.Component {
  componentDidMount() {
    if (document.cookie) {
      this.props.fetchOrderBySess()
    }
  }

  render() {
    if (this.props.order.orderContent.id) {
      return (
        <div className="container">
          <h1>Your Cart</h1>
          <ul>{this.props.order.orderContent.CartItem.map(cartRow => <div>
            <li><div>{cartRow.item.name} x {cartRow.quantity}</div><div>{cartRow.itemTotal}</div></li>
          </div>)}</ul>
          <button className="checkout btn">
            <Link to="/cart/1">Checkout</Link>
          </button>
        </div>
      )
    }
    return (
      <div className="container">
        <h1>Your Cart</h1>
        <div>Cart Items are Loading</div>
        <button className="checkout btn">
          <Link to="/cart/1">Checkout</Link>
        </button>
      </div>
    )


  }
}

const mapDispatchToProps = dispatch => ({
  fetchOrderBySess: () => dispatch(fetchOrderBySession()),
  fetchOrder: id => dispatch(fetchOrderStartAsync(id))
});
const mapStateToProps = state => ({
  order: state.order
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
