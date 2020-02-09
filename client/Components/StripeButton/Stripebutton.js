import React from "react";
import { connect } from "react-redux";
// utilities
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import {
  markOrdercheckedOut,
  fetchOrderBySession
} from "../../Redux/Order/actions/order.actions";

class StripeCheckoutButton extends React.Component {
  currency = "usd";
  stripePrice = this.props.order.orderInfo.checkoutTotal * 100;
  publishableKey = "pk_test_caMWnDLW56OiDvnLwYcll7g600SkFDQ6Pq";

  onToken = token => {
    axios
      .post("api/payment", {
        amount: this.props.order.orderInfo.checkoutTotal * 100,
        token
      })
      .then(res => {
        alert("Payment Complete");
      })
      .then(() => this.props.markOrderComplete(this.props.order.orderInfo.id))
      .then(() => this.props.fetchOrderBySess())
      .catch(error => {
        alert("There was an issue with your payment.");
        console.log(error);
      });
  };
  render() {
    const { name, description, email } = this.props;
    return (
      <StripeCheckout
        name={name}
        ComponentClass="div"
        description={description}
        amount={this.props.order.orderInfo.checkoutTotal * 100}
        token={this.onToken}
        currency={this.currency}
        stripeKey={this.publishableKey}
        email={email}
        shippingAddress
        billingAddress
      />
    );
  }
}
const mapStateToProps = state => ({
  order: state.order
});
const mapDispatchToProps = dispatch => ({
  markOrderComplete: id => dispatch(markOrdercheckedOut(id)),
  fetchOrderBySess: () => dispatch(fetchOrderBySession())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StripeCheckoutButton);
