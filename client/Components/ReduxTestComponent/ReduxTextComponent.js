import React from "react";
//React-Redux
import { connect } from "react-redux";
//actions
import { addUser, removeUser } from "../../Redux/User/actions/user.actions";
import { addItem, removeItem } from "../../Redux/Cart/actions/cart.actions";

class ReduxTestComponent extends React.Component {
  componentDidMount() {
    console.log("cart:", this.props.cart);
    console.log("user:", this.props.user);
    console.log("inventory:", this.props.inventory);
  }

  addUserFunction = e => {
    e.preventDefault();
    this.props.addUser({ name: "Test User" });
  };

  removeUserFunction = e => {
    e.preventDefault();
    this.props.removeUser();
  };

  addItemFunction = (e, id, name, price) => {
    e.preventDefault();
    this.props.addItem({ id: id, name: name, price: price });
  };

  removeItemFunction = (e, id, name, price) => {
    e.preventDefault();
    this.props.removeItem({ id: id, name: name, price: price });
  };

  render() {
    let totalCost = this.props.cart.reduce(
      (acc, { quantity, price }) => (acc += quantity * price),
      0
    );
    return (
      <div>
        THIS IS A REDUX TEST COMPONENT
        <div>
          add/remove user
          <button onClick={e => this.addUserFunction(e)}>add user</button>
          <button onClick={e => this.removeUserFunction(e)}>remove user</button>
        </div>
        <div>
          add/remove bubble gum
          <button onClick={e => this.addItemFunction(e, 1, "bubblegum", 4)}>
            add item
          </button>
          <button onClick={e => this.removeItemFunction(e, 1, "bubblegum", 4)}>
            remove item
          </button>
        </div>
        <div>
          add/remove pencil
          <button onClick={e => this.addItemFunction(e, 2, "pencil", 1)}>
            add item
          </button>
          <button onClick={e => this.removeItemFunction(e, 2, "pencil", 1)}>
            remove item
          </button>
        </div>
        <div>
          ***** TEST CART *****
          {this.props.cart.map(({ name, quantity, price }) => {
            return (
              <div>
                <span>{`NAME: ${name} `}</span>
                <span>{`PRICE: $ ${price} `}</span>
                <span>{`COUNT: ${quantity} `}</span>
              </div>
            );
          })}
        </div>
        TOTAL COST: ${totalCost}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addUser: user => dispatch(addUser(user)),
  removeUser: () => dispatch(removeUser()),
  addItem: item => dispatch(addItem(item)),
  removeItem: item => dispatch(removeItem(item))
});

const mapStateToProps = state => ({
  cart: state.cart.cartContent,
  user: state.user,
  inventory: state.inventory
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxTestComponent);
