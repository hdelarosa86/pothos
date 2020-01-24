import React from "react";
//React-Redux
import { connect } from "react-redux";
import { userLogIn, userLogOut } from "../Redux/User/actions/user.actions";

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        password: ""
      },
      loggedIn: false,
      logInErr: false
    };
  }

  handleLogIn = e => {
    e.preventDefault();
    this.props
      .userLogIn(this.state.user)
      .then(() => {
        this.setState({ logInErr: false, loggedIn: true });
      })
      .catch(err => {
        console.error(err);
        this.setState({ logInErr: true, loggedIn: false });
      });
  };

  handleLogOut = e => {
    console.log("clicking log out");
    this.props
      .userLogOut(this.state.user)
      .then(() => {
        this.setState({ loggedIn: false });
      })
      .catch(err => {
        console.error(err);
        this.setState({ loggedIn: true });
      });
  };

  handleOnChange = ({ target: { name, value } }) => {
    this.setState({ logInErr: false });
    this.setState(prevState => {
      let user = { ...prevState.user };
      user[name] = value;
      return { user };
    });
  };

  render() {
    return (
      <div>
        {this.state.logInErr && <p>Invalid email or password</p>}
        <form onSubmit={this.handleLogIn}>
          <input type="text" name="email" onChange={this.handleOnChange} />
          <input type="text" name="password" onChange={this.handleOnChange} />
          <button type="submit" name="logIn" disabled={this.state.loggedIn}>
            Log In
          </button>
        </form>
        <button type="button" name="logOut" onClick={this.handleLogOut}>
          Log Out
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userLogIn: user => dispatch(userLogIn(user)),
    userLogOut: user => dispatch(userLogOut(user))
  };
};

export default connect(null, mapDispatchToProps)(LogIn);
