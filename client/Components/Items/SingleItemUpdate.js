import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  singleItemFetchStartAsync,
  updateItemThenFetchAll
} from "../../Redux/Items/actions/items.actions";
class SingleItemUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      submitForm: false
    };
  }
  // Populate empty item state with single item prop
  componentDidUpdate(oldState) {
    const newState = this.props;
    if (oldState.singleItem !== newState.singleItem) {
      this.setState({ ...this.state, item: { ...newState.singleItem } });
    }
  }
  // Fetches single item state
  componentDidMount() {
    const { fetchItem } = this.props;
    fetchItem(this.props.Location.match.params.id);
  }
  // Changes current state value to new state value
  handleOnChange = ({ target: { name, value } }) => {
    this.setState({ submitForm: false });
    this.setState(prevState => {
      let item = { ...prevState.item };
      item[name] = value;
      return { item };
    });
  };
  // Submit and updates current item in item list
  handleSubmit = e => {
    e.preventDefault();
    this.props
      .updateItem(this.state.item)
      .then(() => {
        this.setState({ submitForm: false });
        this.props.Location.history.push("/admin/items/pages/1");
      })
      .catch(err => {
        this.setState({ submitForm: true });
        console.error(err);
      });
  };

  render() {
    const { item } = this.state;
    if (this.props.singleItem.name && this.state.item.id !== undefined) {
      return (
        <div className="container">
          <h1>Edit {this.props.singleItem.name}</h1>
          <form>
            <div>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={item.name}
                onChange={this.handleOnChange}
              />
            </div>
            <div>
              <label>Inventory</label>
              <input
                type="number"
                name="inventory"
                value={item.inventory}
                onChange={this.handleOnChange}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                type="number"
                name="price"
                value={item.price}
                onChange={this.handleOnChange}
              />
            </div>
            <div>
              <label>Description</label>
              <input
                type="text"
                name="description"
                value={item.description}
                onChange={this.handleOnChange}
              />
            </div>
            <div>
              <label>Size</label>
              <input
                type="text"
                name="size"
                value={item.size}
                onChange={this.handleOnChange}
              />
            </div>
            <div>
              <label>Image</label>
              <input
                type="url"
                name="imageUrl"
                value={item.imageUrl}
                onChange={this.handleOnChange}
              />
            </div>
            <Link to="/shop">
              <span className="admin-update">
                <button
                  type="button"
                  name="submitForm"
                  onClick={e => this.handleSubmit(e)}
                >
                  Update Item
                </button>
              </span>
            </Link>
          </form>
          {this.state.submitForm && <p>Please fill out form correctly</p>}
        </div>
      );
    }
    return <div className="container">No A Real Item</div>;
  }
}

const mapDispatchToProps = dispatch => ({
  fetchItem: id => dispatch(singleItemFetchStartAsync(id)),
  updateItem: item => dispatch(updateItemThenFetchAll(item))
});

const mapStateToProps = state => ({
  singleItem: state.inventory.selectedItem
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleItemUpdate);
