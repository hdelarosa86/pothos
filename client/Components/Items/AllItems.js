import React, { Component } from "react";
import { connect } from "react-redux";
import ItemPreview from "./ItemPreview";
import { allItemsFetchStartAsync } from "../../Redux/Items/actions/items.actions";

export class AllItems extends React.Component {
  componentDidMount() {
    const { allItemsFetchStartAsync } = this.props;
    allItemsFetchStartAsync();
  }
  render() {
    const { inventory } = this.props;
    const generateItemCards = inventoryArr => {
      if (inventoryArr.length > 0) {
        return (
          <div className="container">
            <div className="row">
              {inventoryArr.map(item => (
                <ItemPreview item={item} />
              ))}
            </div>
          </div>
        );
      }
      return <div className="container">Items are loading...</div>;
    };

    return <div>{generateItemCards(inventory)}</div>;
  }
}

const mapDispatchToProps = dispatch => ({
  allItemsFetchStartAsync: () => dispatch(allItemsFetchStartAsync())
});
const mapStateToProps = state => ({
  inventory: state.inventory.items
});

export default connect(mapStateToProps, mapDispatchToProps)(AllItems);
