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
pagination: Bolean +true/false
filterMethods: Array +size +price

onMount the component checks ....
-> using an ENUM for the TYPE, PAGINATION and redux store for current filtering methods.
  --> based on conditional dispatches fetch and passes data to MenuBar and ListContent

** wrap listContent is HOC spinner
*/
export class List extends React.Component {
  componentDidMount() {
    this.load();
  }
  componentDidUpdate(prevProp) {
    console.log(this.props.match.params.pageId);
    if (prevProp.match.params.pageId !== this.props.match.params.pageId) {
      this.load();
    }
  }
  load = () => {
    if (this.props.type === "items") {
      if (this.props.pagination == true && this.props.match.params.pageId) {
        this.props.allItemsFetchStartAsync(
          Number(this.props.match.params.pageId)
        );
      } else {
        //this.props.allItemsFetchStartAsync();
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
      <>
        <Menubar
          pagination={this.props.pagination}
          filterMethods={this.props.filterMethods}
        />
        <ListContent
          type={this.props.type}
          content={this.props.type === "items" ? this.props.items : null}
        />
      </>
    );
  }
}
const mapStateToProps = state => ({
  items: state.inventory.items
});

const mapDispatchToProps = dispatch => ({
  allItemsFetchStartAsync: page => dispatch(allItemsFetchStartAsync(page))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List));
