import React from "react";
import { connect } from "react-redux";
import ItemPreview from "./ItemPreview";

export const AllItems = ({ inventory }) => {
  const generateItemCards = inventoryArr => {
    if (inventoryArr.length > 0) {
      return inventoryArr.map(item => <ItemPreview item={item} />);
    }
    return <div>Items are loading...</div>;
  };

  return <div>{generateItemCards(inventory)}</div>;
};

const mapStateToProps = state => ({
  inventory: state.inventory.items
});
export default connect(mapStateToProps)(AllItems);
