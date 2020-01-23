import React from "react";
//React-Redux
import { connect } from "react-redux";
import axios from "axios";

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        password: "",
      },
      loggedIn: false,
      logInErr: false,
    };
  }
  componentDidMount() {
   
  }

  handleLogIn = e => {
    e.preventDefault();
    axios
      .post("/login", this.state.user)
      .then(() => {
        this.setState({ loggedIn: true, logInErr: false });
      })
      .catch(err => {
        console.error(err);
        this.setState({ logInErr: true });
      });
  };

  handleOnChange = ({ target: { name, value } }) => {
    // const { name, value } = e.target;
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
          <button type="submit" name="logIn">Log In</button>
          <button type="submit" name="logOut">Log Out</button>
        </form>
      </div>
    );
  }
}

export default LogIn;
