import React from "react";
import { connect } from "react-redux";
import { deleteUserAdminThenFetchAll } from "../../Redux/AllUsers/action/AllUsers.action";

class AllUsers extends React.Component {
  constructor() {
    super();
  }

  handleOnClickDelete = (e, id) => {
    e.preventDefault();
    this.props
      .deleteUser(id)
      .then(() => {
        console.log("Success");
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    const { user } = this.props;
    return (
      <div>
        <span>
          <img src={user.imageUrl} />
        </span>
        <span>Id: {user.id}</span>
        <span>First Name: {user.firstName}</span>
        <span>Last Name: {user.lastName}</span>
        <span>Email: {user.email}</span>
        <span>admin: {`${user.admin}`}</span>
        <button>Edit</button>
        <button onClick={e => this.handleOnClickDelete(e, user.id)}>Delete</button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteUser: user => dispatch(deleteUserAdminThenFetchAll(user))
  };
};
const mapStateToProps = state => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
