import React from "react";
// utilities
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

class StripeCheckoutButton extends React.Component {
  currency = "usd";
  stripePrice = this.props.amount * 100;
  publishableKey = "pk_test_caMWnDLW56OiDvnLwYcll7g600SkFDQ6Pq";

  onToken = token => {
    axios
      .post("api/payment", {
        amount: this.stripePrice,
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
        amount={this.stripePrice}
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

export default StripeCheckoutButton;
