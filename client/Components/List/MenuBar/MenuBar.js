import React from "react";
//utils
import { connect } from "react-redux";
import { Link } from "react-router-dom";

/*
The MenuBar component excepts 2 arguments:
pagination: Boolean +Pulls pagination argument from parent list component
filterMethods: Array +Pulls filter methods from parent list component

onMount the component ....
-> displays available pages with links if pagination is true
-> displays all filtering methods with appropriate actions
*/

export class MenuBar extends React.Component {
  render() {
    const pageArray = [];
    if (this.props.pages) {
      for (let i = 1; i < this.props.pages + 1; i++) {
        pageArray.push(i);
      }
    }
    return (
      <div className='listComponentMenuBar'>
        <div className='listComponentMenuBar_pages'>
          {this.props.pagination ? `PAGES :` : null}
          {this.props.pagination
            ? pageArray.map(num => (
                <span>
                  <Link to={`/shop/pages/${num}`}>{num} - </Link>
                </span>
              ))
            : null}
        </div>
        <div className='listComponentMenuBar_filters'>
          {this.props.filterMethods ? `FILTER :` : null}
          {this.props.filterMethods
            ? this.props.filterMethods.map(method => <span>{method}</span>)
            : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pages: state.inventory.pages
});

export default connect(mapStateToProps)(MenuBar);
