import { Link } from "react-router-dom";
import React from "react";
const ItemPreview = ({ item }) => {
  return (
    <div id="itemPreviewCard">
      <img src={item.imageUrl} />
      <h1>{item.name}</h1>
      {/* <Link to={`/item/${item.id}`}>VIEW PLANT</Link> */}
    </div>
  );
};

export default ItemPreview;
