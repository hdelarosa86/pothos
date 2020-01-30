import React from "react";
import { connect } from "react-redux";
import { addInUser } from "../../Redux/User/actions/user.actions";
import { Link, Redirect } from "react-router-dom";
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: ""
      },
      logInErr: false
    };
  }
  // Change the empty state with the onChange value
  handleOnChange = ({ target: { name, value } }) => {
    this.setState({ logInErr: false });
    this.setState(prevState => {
      let user = { ...prevState.user };
      user[name] = value;
      return { user };
    });
  };
  // Submit will send the user data on state and create a user
  handleLogIn = e => {
    e.preventDefault();
    this.props
      .addUser(this.state.user)
      .then(() => {
        this.setState({ logInErr: false });
        this.props.history.push("/");
      })
      .catch(err => {
        console.error(err);
        this.setState({ logInErr: true });
      });
  };
  // Render in the login component
  // Sign up should work properly however if any change need to be made,
  // please use this component.
  render() {
    return (
      <div className="col s6 center-align">
        <h1>Sign up now</h1>
        <form>
          <div>
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              onChange={this.handleOnChange}
            />
          </div>
          <div>
            <label>Last Name</label>
            <input type="text" name="lastName" onChange={this.handleOnChange} />
          </div>
          <div>
            <label>Email</label>
            <input type="email" name="email" onChange={this.handleOnChange} />
          </div>
          <div>
            <label>Username</label>
            <input type="text" name="username" onChange={this.handleOnChange} />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={this.handleOnChange}
            />
          </div>
          <Link to="/">
            <button type="button" name="logIn" onClick={this.handleLogIn}>
              Sign up
            </button>
          </Link>
        </form>
        {this.state.logInErr && <p>Fill out form correctly</p>}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addUser: user => dispatch(addInUser(user))
  };
};
const mapStateToProps = state => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);