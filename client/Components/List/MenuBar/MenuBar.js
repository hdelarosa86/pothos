import React from "react";
//utils
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
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

  menuRouter = {
    items: "shop",
    orders: "orders",
    users: "users"
  };

  render() {
    return (
      <div className="listComponentMenuBar">
        <div className="listComponentMenuBar_pages">
          {this.props.pagination && this.props.match.params.pageId ? (
            <div className="col s12 m12 l12 center-align">
              <h1>ALL THE PLANTS YOU WANT IN POTHOS</h1>
            </div>
          ) : null}
          <div className="col s12 m12 l12 center-align">
            {this.props.pagination && this.props.match.params.pageId
              ? this.pages().map(num => (
                  <Link
                    to={`/${this.props.adminBool === true ? "admin/" : ""}${
                      this.props.adminBool &&
                      this.menuRouter[this.props.type] === "shop"
                        ? "item"
                        : `${this.menuRouter[this.props.type]}`
                    }/pages/${num}`}
                  >
                    {num}{" "}
                  </Link>
                ))
              : null}
          </div>
        </div>
        <div className="listComponentMenuBar_filters">
          <div className="row">
            <div className="col s12 m12 l12 center-align">
              {this.props.filterMethods ? (
                <div className="filter-label">FILTER</div>
              ) : null}
              {this.props.filterMethods
                ? this.props.filterMethods.map(method => {
                    return (
                      <span>
                        {!method ? (
                          <button
                            onClick={() => this.props.selectFilter(method)}
                          >
                            NO FILTER
                          </button>
                        ) : (
                          <button
                            onClick={() => this.props.selectFilter(method)}
                          >
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
        </div>
      </div>
    );
  }
}

const mapDispatchToprops = dispatch => ({
  selectFilter: filter => dispatch(selectFilter(filter))
});
const mapStateToprops = state => ({
  admin: state.user.currentUser.admin
});

export default withRouter(
  connect(mapStateToprops, mapDispatchToprops)(MenuBar)
);
