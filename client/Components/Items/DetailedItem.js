import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { singleItemFetchStartAsync } from "../../Redux/Items/actions/items.actions";
import {
  fetchOrderBySession,
  addToOrderStartAsync
} from "../../Redux/Order/actions/order.actions";
import List from "../List/List";

export class DetailedItem extends React.Component {
  // This will update the params Id when a different item is clicked 
  // This will allow users to switch between the list items below the selected single item
  componentDidUpdate(oldProps) {
    if (
      oldProps.Location.match.params.id !== this.props.Location.match.params.id
    ) {
      this.props.fetchItem(this.props.Location.match.params.id);
    }
  }
  componentDidMount() {
    if (document.cookie) {
      this.props.fetchOrder();
    }
    const { fetchItem } = this.props;
    fetchItem(this.props.Location.match.params.id);
  }

  render() {
    if (this.props.singleItem.name) {
      const { singleItem, addToCart, order } = this.props;
      return (
        <div className="single-item">
          <div className="container">
            <div className="row">
              <div className="col s12 m12 l6 left-align">
                <img className={"responsive-img"} src={singleItem.imageUrl} />
              </div>
              <div className="col s12 m12 l6 left-align">
                <h2>{singleItem.name}</h2>
                <p>Description:</p>
                <h6>{singleItem.description}</h6>
                <p>Size:</p>
                <h6>{singleItem.size}</h6>
                <p>price:</p>
                <h6>${singleItem.price}</h6>

                <button
                  className="item-add"
                  onClick={() =>
                    addToCart(
                      singleItem.id,
                      order.orderInfo.id,
                      singleItem.price
                    ).then(() => {
                      // Noticed that the order info would change into the wrong session which will cause an error
                      // This error would occur when the add to cart is pressed twice
                      // This was not an issue before on hashRouter, however, browser router does push this error 
                      // Added the fetch order after the add to cart is called, and it fixed the issue
                      this.props.fetchOrder();
                    }).catch(err => console.error(err))
                  }
                >
                  ADD TO CART
                </button>
                {this.props.admin && (
                  <Link to={`/shop/${singleItem.id}/update`}>
                    <button className="item-edit">EDIT ITEM</button>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col s12 m12 l12 center-align">
              <div>
                <h6>
                  If you like {singleItem.name} Check out these pothos plants!
                </h6>
              </div>
              <List
                type="items"
                pagination={false}
                filterMethods={null}
                perPage={3}
              />
            </div>
          </div>
        </div>
      );
    }
    return <div className="container">ITEM LOADING</div>;
  }
}

const mapDispatchToProps = dispatch => ({
  fetchItem: id => dispatch(singleItemFetchStartAsync(id)),
  fetchOrder: () => dispatch(fetchOrderBySession()),
  addToCart: (itemId, orderId, itemTotal) =>
    dispatch(addToOrderStartAsync(itemId, orderId, itemTotal))
});
const mapStateToProps = state => ({
  singleItem: state.inventory.selectedItem,
  admin: state.user.currentUser.admin,
  order: state.order
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailedItem);
