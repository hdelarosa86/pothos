import React from "react";
import { connect } from "react-redux";
import { createItemThenFetchAll } from "../../Redux/Items/actions/items.actions";
import { Link } from "react-router-dom";
class ItemCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      submitForm: false
    };
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

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.props);
    this.props
      .createItem(this.state.item)
      .then(() => {
        this.setState({ submitForm: false });
        this.props.history.push("/admin/items/pages/1");
      })
      .catch(err => {
        this.setState({ submitForm: true });
        console.error(err);
      });
  };
  render() {
    return (
      <div className="container">
        <h1>Create New Item</h1>
        <form>
          <div>
            <label>Name</label>
            <input type="text" name="name" onChange={this.handleOnChange} />
          </div>
          <div>
            <label>Inventory</label>
            <input
              type="number"
              name="inventory"
              onChange={this.handleOnChange}
            />
          </div>
          <div>
            <label>Price</label>
            <input type="number" name="price" onChange={this.handleOnChange} />
          </div>
          <div>
            <label>Description</label>
            <input
              type="text"
              name="description"
              onChange={this.handleOnChange}
            />
          </div>
          <div>
            <label>Size</label>
            <input type="text" name="size" onChange={this.handleOnChange} />
          </div>
          <div>
            <label>Image URL</label>
            <input type="url" name="imageUrl" onChange={this.handleOnChange} />
          </div>
          <Link to="/shop">
            <span className="admin-update">
              <button
                type="button"
                name="submitForm"
                onClick={e => this.handleSubmit(e)}
              >
                Create Item
              </button>
            </span>
          </Link>
        </form>
        {this.state.submitForm && <p>Please fill out form correctly</p>}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createItem: item => dispatch(createItemThenFetchAll(item))
  };
};
const mapStateToProps = state => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ItemCreate);
