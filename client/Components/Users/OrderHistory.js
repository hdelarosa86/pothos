import React from "react";
import { connect } from "react-redux";

import { fetchOrderByUser } from "../../Redux/Order/actions/order.actions";

class OrderHistory extends React.Component {
  componentDidMount() {
    if (document.cookie) {
      this.props.fetchOrderByUser(this.props.user.currentUser.id);
    }
  }

  render() {
    if (this.props.order.orderInfo.id) {
      if (this.props.order.orderHistory.length > 0) {
        return (
          <div>
            <h6 className="name-label">Order History</h6>
            {this.props.order.orderHistory.map(order => (
              <div className="col s12 m12 l12">
                <div>Id: {order.id}</div>
                <div>Total: {order.checkoutTotal}</div>
                <div>UserId: {order.userId}</div>
                <div>Status:{order.status}</div>
              </div>
            ))}
          </div>
        );
      } else {
        return (
          <div className="col s12 m12 l12">
            <div>"No order history found"</div>
          </div>
        );
      }
    } else {
      return (
        <div className="col s12 m12 l12">
          <div>"Order History Loading"</div>
        </div>
      );
    }
  }
}

const mapDispatchToProps = dispatch => ({
  fetchOrderByUser: id => dispatch(fetchOrderByUser(id))
});
const mapStateToProps = state => ({
  user: state.user,
  order: state.order
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
