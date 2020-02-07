import React from "react";

const AllOrders = ({ order }) => {
  console.log(order);
  return (
    <div className="col s12 m12 l12">
      <div>Id: {order.id}</div>
      <div>Total: {order.checkoutTotal}</div>
      <div>UserId: {order.userId}</div>
      <div className="filter">
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default AllOrders;
