import React from "react";
import { connect } from "react-redux";
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
      logInErr: false
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

  render() {
    return (
      <div className="container">
        <h1>Where Form Lives</h1>
        <form>
          <div>
            <label>Email</label>
            <input type="text" name="email" onChange={this.handleOnChange} />
          </div>
          <div>
            <label>Password</label>
            <input type="text" name="password" onChange={this.handleOnChange} />
          </div>
          <Link to="/">
            <button type="button" name="logIn" onClick={this.handleLogIn}>
              Log In
            </button>
          </Link>
          <a href={"/api/github/login"}>
            <button type="button" name="logIn">
              Github
            </button>
          </a>
        </form>
        {this.state.logInErr && <p>Invalid email or password</p>}
        {this.props.loggedIn && <Redirect to="/" />}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userLogIn: user => dispatch(userLogIn(user))
  };
};
const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
