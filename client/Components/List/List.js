import React from "react";
//utils
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// component
import Menubar from "./MenuBar/MenuBar";
import ListContent from "./ListContent/ListContent";
//actions
import { allItemsFetchStartAsync } from "../../Redux/Items/actions/items.actions";
import { allUserAdminFetchStartAsync } from "../../Redux/AllUsers/action/AllUsers.action";
import { allOrderAdminFetchStartAsync } from "../../Redux/AllOrders/action/AllOrders.action";

/*
The List component excepts 4 arguments:
type: string + Users +Items +orders
pagination: Bolean +true/false *if there is no page param id, pagination will only display first set.
filterMethods: Array +size +price ... etc *can extend for almost any field in the model
perPage: NUM +number indicates the items perpage

onMount the component checks ....
-> using an ENUM for the TYPE, PAGINATION and redux store for current filtering methods.
  --> based on conditional dispatches fetch and passes data to MenuBar and ListContent

ADD?
** HOC spinner
** Login check
*/
export class List extends React.Component {
  componentDidMount() {
    this.load();
  }
  componentDidUpdate(prevProp) {
    if (
      prevProp.match.params.pageId !== this.props.match.params.pageId ||
      prevProp.filter !== this.props.filter
    ) {
      this.load();
    }
  }

  load = () => {
    if (this.props.type === "items") {
      if (this.props.pagination == true && this.props.match.params.pageId) {
        if (this.props.filter) {
          this.props.allItemsFetchStartAsync(
            this.props.perPage,
            Number(this.props.match.params.pageId),
            this.props.filter
          );
        } else if (this.props.filter === null) {
          this.props.allItemsFetchStartAsync(
            this.props.perPage,
            Number(this.props.match.params.pageId)
          );
        }
      } else if (this.props.pagination == true) {
        if (this.props.filter) {
          this.props.allItemsFetchStartAsync(
            this.props.perPage,
            1,
            this.props.filter
          );
        } else if (this.props.filter === null) {
          this.props.allItemsFetchStartAsync(this.props.perPage, 1);
        }
      } else {
        if (this.props.filter) {
          this.props.allItemsFetchStartAsync(
            undefined,
            undefined,
            this.props.filter
          );
        } else if (this.props.filter === null) {
          this.props.allItemsFetchStartAsync();
        }
      }
    } else if (this.props.type === "orders" && this.props.match.params.pageId) {
      if (this.props.pagination == true) {
        if (this.props.filter) {
          this.props.allOrderAdminFetchStartAsync(
            this.props.perPage,
            Number(this.props.match.params.pageId),
            this.props.filter
          );
        } else if (this.props.filter === null) {
          this.props.allOrderAdminFetchStartAsync(
            this.props.perPage,
            Number(this.props.match.params.pageId)
          );
        }
      } else if (this.props.pagination == true) {
        if (this.props.filter) {
          this.props.allOrderAdminFetchStartAsync(
            this.props.perPage,
            1,
            this.props.filter
          );
        } else if (this.props.filter === null) {
          this.props.allOrderAdminFetchStartAsync(this.props.perPage, 1);
        }
      } else {
        if (this.props.filter) {
          this.props.allOrderAdminFetchStartAsync(
            undefined,
            undefined,
            this.props.filter
          );
        } else if (this.props.filter === null) {
          this.props.allOrderAdminFetchStartAsync();
        }
      }
    } else if (this.props.type === "users" && this.props.match.params.pageId) {
      if (this.props.pagination == true) {
        if (this.props.filter) {
          this.props.allUserAdminFetchStartAsync(
            this.props.perPage,
            Number(this.props.match.params.pageId),
            this.props.filter
          );
        } else if (this.props.filter === null) {
          this.props.allUserAdminFetchStartAsync(
            this.props.perPage,
            Number(this.props.match.params.pageId)
          );
        }
      } else if (this.props.pagination == true) {
        if (this.props.filter) {
          this.props.allUserAdminFetchStartAsync(
            this.props.perPage,
            1,
            this.props.filter
          );
        } else if (this.props.filter === null) {
          this.props.allUserAdminFetchStartAsync(this.props.perPage, 1);
        }
      } else {
        if (this.props.filter) {
          this.props.allUserAdminFetchStartAsync(
            undefined,
            undefined,
            this.props.filter
          );
        } else if (this.props.filter === null) {
          this.props.allUserAdminFetchStartAsync();
        }
      }
    } else {
      alert("no content specified");
    }
  };

  typeContentRouter = () => {
    if (this.props.type === "items") {
      return this.props.items;
    } else if (this.props.type === "users") {
      return this.props.users;
    } else if (this.props.type === "orders") {
      return this.props.orders;
    }
  };

  typeCountRouter = () => {
    if (this.props.type === "items") {
      return this.props.itemsCount;
    } else if (this.props.type === "users") {
      return this.props.usersCount;
    } else if (this.props.type === "orders") {
      return this.props.ordersCount;
    }
  };

  render() {
    return (
      <div>
        <Menubar
          type={this.props.type}
          pagination={this.props.pagination}
          filterMethods={this.props.filterMethods}
          perPage={this.props.perPage}
          count={this.typeCountRouter()}
          adminBool={this.props.adminBool}
        />
        <ListContent
          type={this.props.type}
          content={this.typeContentRouter()}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  items: state.inventory.items,
  itemsCount: state.inventory.count,
  filter: state.nav.filter,
  users: state.allUsers.users,
  usersCount: state.allUsers.count,
  orders: state.allOrders.orders,
  ordersCount: state.allOrders.count
});

const mapDispatchToProps = dispatch => ({
  allItemsFetchStartAsync: (perPage, page, filter) =>
    dispatch(allItemsFetchStartAsync(perPage, page, filter)),
  allUserAdminFetchStartAsync: (perPage, page, filter) =>
    dispatch(allUserAdminFetchStartAsync(perPage, page, filter)),
  allOrderAdminFetchStartAsync: (perPage, page, filter) =>
    dispatch(allOrderAdminFetchStartAsync(perPage, page, filter))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List));
