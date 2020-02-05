import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchOrderBySession,
  incrementItemStartAsync,
  decrementItemStartAsync
} from "../../Redux/Order/actions/order.actions";

class Cart extends React.Component {
  componentDidMount() {
    if (document.cookie) {
      this.props.fetchOrderBySess();
    }
  }

  cartGenerate(arr) {
    const { addQuantity, minusQuantity } = this.props;
    let cartTotal = 0;
    const rows = arr.map(cartRow => {
      cartTotal += parseInt(cartRow.itemTotal);
      return (
        <div>
          <li>
            <div>
              {cartRow.item.name} x {cartRow.quantity}
            </div>
            <div>{cartRow.itemTotal}</div>
            <div>
              <button
                onClick={() =>
                  addQuantity(cartRow.id, cartRow.orderId, cartRow.item.price)
                }
              >
                +
              </button>
              <button
                onClick={() =>
                  minusQuantity(cartRow.id, cartRow.orderId, cartRow.item.price)
                }
              >
                -
              </button>
            </div>
          </li>
        </div>
      );
    });
    let cartTotalFloat = cartTotal.toFixed(2);

    return (
      <div>
        <ul>{rows}</ul>
        <div>TOTAL:{cartTotalFloat}</div>
      </div>
    );
  }

  render() {
    if (this.props.order.orderInfo.id) {
      return (
        <div className="container">
          <h1>Your Cart</h1>
          {this.cartGenerate(this.props.order.orderInfo.CartItem)}
          <button className="checkout btn">
            <Link to="/cart/1">Checkout</Link>
          </button>
        </div>
      );
    }
    return (
      <div className="container">
        <h1>Your Cart</h1>
        <div>Cart Items are Loading</div>
        <button className="checkout btn">
          <Link to="/cart/1">Checkout</Link>
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchOrderBySess: () => dispatch(fetchOrderBySession()),
  addQuantity: (cartItemId, orderId, price) =>
    dispatch(incrementItemStartAsync(cartItemId, orderId, price)),
  minusQuantity: (cartItemId, orderId, price) =>
    dispatch(decrementItemStartAsync(cartItemId, orderId, price))
});
const mapStateToProps = state => ({
  order: state.order
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
