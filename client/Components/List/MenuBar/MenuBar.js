import React from "react";
//utils
import { connect } from "react-redux";
import { Link } from "react-router-dom";
//actions
import { selectFilter } from "../../../Redux/Nav/actions/nav.actions";

/*
The MenuBar component excepts 5 arguments:
type: String +this is used in the link url redirect
pagination: Boolean +Pulls pagination argument from parent list component
filterMethods: Array +Pulls filter methods from parent list component
perPage: Num +uses perPage num to calulate appropriate number of available links
count: Num +uses count num to calulate appropriate number of available links


onMount the component ....
-> displays available pages with links if pagination is true
-> displays all filtering methods with appropriate actions
*/

export class MenuBar extends React.Component {
  pages = () => {
    return Array(Math.ceil(this.props.count / this.props.perPage))
      .fill(0)
      .map((val, idx) => (val = idx + 1));
  };

  render() {
    return (
      <div className="listComponentMenuBar">
        <div className="listComponentMenuBar_pages">
          {this.props.pagination ? `PAGES :` : null}
          {this.props.pagination
            ? this.pages().map(num => (
                <span>
                  <Link to={`/${this.props.type}/pages/${num}`}>{num} - </Link>
                </span>
              ))
            : null}
        </div>
        <div className="listComponentMenuBar_filters">
          {this.props.filterMethods ? `FILTER :` : null}
          {this.props.filterMethods
            ? this.props.filterMethods.map(method => {
                return (
                  <span>
                    {!method ? (
                      <button onClick={() => this.props.selectFilter(method)}>
                        NO FILTER
                      </button>
                    ) : (
                      <button onClick={() => this.props.selectFilter(method)}>
                        {" "}
                        {method}{" "}
                      </button>
                    )}
                  </span>
                );
              })
            : null}
        </div>
      </div>
    );
  }
}

const mapDispatchToprops = dispatch => ({
  selectFilter: filter => dispatch(selectFilter(filter))
});

export default connect(null, mapDispatchToprops)(MenuBar);
