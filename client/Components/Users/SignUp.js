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
      logInErr: false,
      passwordHidden: true
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
  showPassword = () => {
    this.setState({ passwordHidden: !this.state.passwordHidden });
  };
  // Render in the login component
  // Sign up should work properly however if any change need to be made,
  // please use this component.
  render() {
    return (
      <div className="col s12 m12 l6 left-align">
        <h3>SIGN UP NOW</h3>
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
            <label>Password</label>
            <input
              type={this.state.passwordHidden ? "password" : "text"}
              name="password"
              onChange={this.handleOnChange}
            />
          </div>
          <label>
            Show Password
            <input
              class="showPassword"
              type="checkbox"
              onChange={this.showPassword}
            />
          </label>
          <div className="filter">
            <Link to="/">
              <button type="button" name="logIn" onClick={this.handleLogIn}>
                Sign up
              </button>
            </Link>
          </div>
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
