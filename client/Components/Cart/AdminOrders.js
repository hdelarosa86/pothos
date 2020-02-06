import React from "react";

const AllOrders = ({ order }) => {
  console.log(order);
  return (
    <div>
      <span>Id: {order.id}</span>
      <span>Total: {order.checkoutTotal}</span>
      <span>UserId: {order.userId}</span>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
};

export default AllOrders;
