import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { singleItemFetchStartAsync } from "../../Redux/Items/actions/items.actions";

export class DetailedItem extends React.Component {
  componentDidMount() {
    const { fetchItem } = this.props;
    fetchItem(this.props.Location.match.params.id);
  }
  render() {
    if (this.props.singleItem.name) {
      const { singleItem } = this.props;
      console.log(singleItem);
      return (
        <div className="container">
          <div className="row">
            <div className="col s6 center-align">
              <img src={singleItem.imageUrl} />
            </div>
            <div className="col s6 center-align">
              <h2>{singleItem.name}</h2>
              <h6>{singleItem.description}</h6>
              <h6>${singleItem.price}</h6>
              <button>ADD TO CART</button>
              {this.props.admin && <Link to={`/shop/${singleItem.id}/update`}>
                <button>EDIT ITEM</button>
              </Link>}
            </div>
          </div>
        </div>
      );
    }
    return <div className="container">ITEM LOADING</div>;
  }
}

const mapDispatchToProps = dispatch => ({
  fetchItem: id => dispatch(singleItemFetchStartAsync(id))
});
const mapStateToProps = state => ({
  singleItem: state.inventory.selectedItem,
  admin: state.user.currentUser.admin
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailedItem);
