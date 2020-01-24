import React from "react";
import { connect } from "react-redux";

export class DetailedItem extends React.Component {
  componentDidMount() {}
  render() {
    const { match } = this.props.Location;
    console.log(match);
    return (
      <div className="container">
        <div className="row">
          <div className="col s6 center-align">
            <h2>This is where image lives</h2>
          </div>
          <div className="col s6 center-align">
            <h2>This is where content lives</h2>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({});
const mapStateToProps = state => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DetailedItem);
