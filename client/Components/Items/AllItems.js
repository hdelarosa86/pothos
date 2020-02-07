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
              <div className="col s12 m12 l4">
                <h1>Pothos has all the plants you want</h1>
                <h4>Shop for the plants you want</h4>
                {inventoryArr.map(item => (
                  <ItemPreview item={item} />
                ))}
              </div>
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
