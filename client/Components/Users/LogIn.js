import React from "react";
import { connect } from "react-redux";
import SignUp from "../Users/SignUp";
import { userLogIn } from "../../Redux/User/actions/user.actions";
import { Link, Redirect } from "react-router-dom";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        password: ""
      },
      logInErr: false,
      passwordHidden: true
    };
  }
  handleOnChange = ({ target: { name, value } }) => {
    this.setState({ logInErr: false });
    this.setState(prevState => {
      let user = { ...prevState.user };
      user[name] = value;
      return { user };
    });
  };

  handleLogIn = e => {
    e.preventDefault();
    this.props
      .userLogIn(this.state.user)
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

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m12 l6 left-align">
            <h3>WELCOME BACK</h3>
            <form>
              <div>
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  onChange={this.handleOnChange}
                />
              </div>
              <div>
                <label>Password</label>
                <input
                  type={this.state.passwordHidden ? "password" : "text"}
                  name="password"
                  onChange={this.handleOnChange}
                />
                <label>Show Password</label>
                <input
                  class="showPassword"
                  type="checkbox"
                  onChange={this.showPassword}
                />
              </div>
              <br />
              <div className="filter">
                <Link to="/">
                  <button type="button" name="logIn" onClick={this.handleLogIn}>
                    Log In
                  </button>
                </Link>
                {/* <Link to={"/"}>
                  <button type="button" name="logIn">
                    Github
                  </button>
                </Link> */}
              </div>
            </form>
            {this.state.logInErr && <p>Invalid email or password</p>}
            {this.props.loggedIn && <Redirect to="/" />}
          </div>
          <SignUp {...this.props} />
        </div>
      </div>
    );
  }
}
// Sign Up Component is in render return
const mapDispatchToProps = dispatch => {
  return {
    userLogIn: user => dispatch(userLogIn(user))
    //githubLogin: () => dispatch(githubLogin())
  };
};
const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
