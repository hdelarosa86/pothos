import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchOrderBySession,
  incrementItemStartAsync,
  decrementItemStartAsync,
  updateOrderTotal
} from "../../Redux/Order/actions/order.actions.js";
import StripeCheckoutButton from "../StripeButton/Stripebutton";

class Cart extends React.Component {
  componentDidMount() {
    if (document.cookie) {
      this.props.fetchOrderBySess();
    }
  }

  cartGenerate(arr) {
    const { addQuantity, minusQuantity, updateCheckoutTotal } = this.props;
    let cartTotal = 0;
    const rows = arr
      .sort((a, b) => {
        console.log(a.id);
        if (a.id > b.id) {
          return 1;
        } else if (b.id > a.id) {
          return -1;
        } else {
          return 0;
        }
      })
      .map(cartRow => {
        cartTotal += parseInt(cartRow.itemTotal);
        return (
          <div className="cart-box">
            <div className="row">
              <div className="col s12 m12 l5 left-align">
                <h6>
                  {cartRow.item.name} x {cartRow.quantity}
                </h6>
              </div>
              <div className="col s12 m12 l5 left-align">
                <h6>{cartRow.itemTotal}</h6>
              </div>
              <div className="col s12 m12 l2 left-align">
                <button
                  onClick={() =>
                    addQuantity(
                      cartRow.id,
                      cartRow.orderId,
                      cartRow.item.price
                    ).then(() =>
                      updateCheckoutTotal(
                        cartRow.orderId,
                        cartTotal + parseInt(cartRow.item.price)
                      )
                    )
                  }
                >
                  +
                </button>
                <button
                  onClick={() =>
                    minusQuantity(
                      cartRow.id,
                      cartRow.orderId,
                      cartRow.item.price
                    ).then(() =>
                      updateCheckoutTotal(
                        cartRow.orderId,
                        cartTotal - parseInt(cartRow.item.price)
                      )
                    )
                  }
                >
                  -
                </button>
              </div>
            </div>
          </div>
        );
      });
    let cartTotalFloat = cartTotal.toFixed(2);
    return (
      <div className="row">
        <ul>{rows}</ul>
        <div className="col s12 m12 l12 left-align">
          <h5>TOTAL:{cartTotalFloat}</h5>
        </div>
      </div>
    );
  }

  render() {
    if (this.props.order.orderInfo.id && this.props.user) {
      const { firstName, lastName, email } = this.props.user;
      return (
        <div className="container">
          <h1>Your Cart</h1>
          {this.props.order.orderInfo.CartItem.length
            ? this.cartGenerate(this.props.order.orderInfo.CartItem)
            : "No plants in your cart!"}

          <div className="filter">
            <button>
              <Link to="/shop/pages/1">Shop for More Plants!</Link>
            </button>

            <button>
              <Link to="/login">Save my cart! Create new account!</Link>
            </button>
          </div>
          <StripeCheckoutButton
            name={firstName}
            description={`Checkout`}
            email={email ? email : null}
          />
        </div>
      );
    }
    return (
      <div className="container">
        <h1>Your Cart</h1>
        <div>Cart Items are Loading</div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchOrderBySess: () => dispatch(fetchOrderBySession()),
  addQuantity: (cartItemId, orderId, price) =>
    dispatch(incrementItemStartAsync(cartItemId, orderId, price)),
  minusQuantity: (cartItemId, orderId, price) =>
    dispatch(decrementItemStartAsync(cartItemId, orderId, price)),
  updateCheckoutTotal: (orderId, checkoutTotal) =>
    dispatch(updateOrderTotal(orderId, checkoutTotal))
});
const mapStateToProps = state => ({
  order: state.order,
  user: state.user.currentUser
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
