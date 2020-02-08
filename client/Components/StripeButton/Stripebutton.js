import React from "react";
import { connect } from "react-redux";
// utilities
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

class StripeCheckoutButton extends React.Component {
  currency = "usd";
  stripePrice = this.props.order.orderInfo.checkoutTotal * 100;
  publishableKey = "pk_test_caMWnDLW56OiDvnLwYcll7g600SkFDQ6Pq";

  onToken = token => {
    axios
      .post("api/payment", {
        amount: this.props.order.orderInfo.checkoutTotal,
        token
      })
      .then(res => {
        alert("Payment Complete");
      })
      .catch(error => {
        alert("There was an issue with your payment.");
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
export default connect(mapStateToProps, null)(StripeCheckoutButton);
