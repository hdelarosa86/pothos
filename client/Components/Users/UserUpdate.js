import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateInUser } from "../../Redux/User/actions/user.actions";
import { singleUserAdminFetchStartAsync } from "../../Redux/AllUsers/action/AllUsers.action";
class UserUpdate extends React.Component {
  constructor(user) {
    super(user);
    this.state = {
      user: null,
      submitFormErr: false
    };
  }

  // Fetches single item state
  componentDidMount() {
    this.setState({
      ...this.state,
      user: this.props.user.currentUser
      // : this.props.fetchUserForAdmin(this.props.location.match.params.id)
    });
    if (this.props.admin) {
      this.props.fetchUserForAdmin(this.props.location.match.params.id);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("prev: ", prevProps);
    console.log("this.props: ", this.props);
    if (prevProps.selectedUser !== this.props.selectedUser) {
      this.setState({ ...this.state, user: this.props.selectedUser });
    }
  }
  // Changes current state value to new state value
  handleOnChange = ({ target: { name, value } }) => {
    this.setState({ submitForm: false });
    this.setState(prevState => {
      let user = { ...prevState.user };
      user[name] = value;
      return { user };
    });
  };
  // Submit and updates current item in item list
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.user);
    this.props
      .updateUser(this.state.user)
      .then(() => {
        this.setState({ submitFormErr: false });
        this.props.location.history.push(
          this.props.admin ? "/admin/users/pages/1" : "/dashboard"
        );
      })
      .catch(err => {
        this.setState({ submitFormErr: true });
        console.error(err);
      });
  };

  render() {
    const { user } = this.state;
    //const { selectedUser } = this.props;
    if (user !== null) {
      return (
        <div className="container">
          <h1>Edit Profile</h1>
          <form>
            <div>
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={this.handleOnChange}
              />
            </div>
            <div>
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={this.handleOnChange}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={this.handleOnChange}
              />
            </div>

            <Link to="/dashboard">
              <span className="admin-update">
                <button
                  type="button"
                  name="submitFormErr"
                  onClick={e => this.handleSubmit(e)}
                >
                  Update User
                </button>
              </span>
            </Link>
          </form>
          {this.state.submitFormErr && <p>Please fill out form correctly</p>}
        </div>
      );
    }
    return <div className="container">No A Real User</div>;
  }
}

const mapDispatchToProps = dispatch => ({
  updateUser: user => dispatch(updateInUser(user)),
  fetchUserForAdmin: userId => dispatch(singleUserAdminFetchStartAsync(userId))
});

const mapStateToProps = state => ({
  user: state.user,
  selectedUser: state.allUsers.selectedUsers,
  admin: state.user.currentUser.admin
});

export default connect(mapStateToProps, mapDispatchToProps)(UserUpdate);
