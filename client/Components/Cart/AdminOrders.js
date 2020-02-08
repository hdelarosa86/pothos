import React from "react";
import { connect } from "react-redux";
import { deleteItemThenFetchAll } from "../../Redux/AllOrders/action/AllOrders.action";

const AllOrders = ({ order, deleteOrder }) => {
  const handleOnClickDelete = (e, id) => {
    e.preventDefault();
    deleteOrder(id)
      .then(() => {
        console.log("Success");
      })
      .catch(err => {
        console.error(err);
      });
  };
  return (
    <div className="col s12 m12 l12">
      <div>Id: {order.id}</div>
      <div>Total: {order.checkoutTotal}</div>
      <div>UserId: {order.userId}</div>
      <div className="filter">
        <button onClick={e => handleOnClickDelete(e, order.id)}>Delete</button>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    deleteOrder: order => dispatch(deleteItemThenFetchAll(order))
  };
};
const mapStateToProps = state => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders);
