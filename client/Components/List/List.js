import React from "react";
//utils
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// component
import Menubar from "./MenuBar/MenuBar";
import ListContent from "./ListContent/ListContent";
//actions
import { allItemsFetchStartAsync } from "../../Redux/Items/actions/items.actions";

/*
The List component excepts 4 arguments:
type: string + Users +Items +Carts
display: String +display +edit
pagination: Bolean +true/false ** if pagination is set to false so is the filtermethods
filterMethods: Array +size +price 
perPage: NUM +number indicates the items perpage

onMount the component checks ....
-> using an ENUM for the TYPE, PAGINATION and redux store for current filtering methods.
  --> based on conditional dispatches fetch and passes data to MenuBar and ListContent

** wrap listContent is HOC spinner
** could added security check
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
    } else if (this.props.type === "carts") {
      if (this.props.pagination == true) {
      } else {
      }
    } else if (this.props.type === "users") {
      if (this.props.pagination == true) {
      } else {
      }
    } else {
      alert("no content specified");
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
          count={this.props.count}
        />
        <ListContent
          type={this.props.type}
          content={this.props.type === "items" ? this.props.items : null}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  items: state.inventory.items,
  filter: state.nav.filter,
  count: state.inventory.count
});

const mapDispatchToProps = dispatch => ({
  allItemsFetchStartAsync: (perPage, page, filter) =>
    dispatch(allItemsFetchStartAsync(perPage, page, filter))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List));
