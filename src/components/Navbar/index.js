import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { verifyLogin } from '../../actions/UserActions';
import Cookies from 'cookies-js';

class Navbar extends Component {
  componentWillMount() {
    // action to check if user is logged in.
  }

  handleClick() {
    this.props.verifyLogin();
  }

  logoutClick() {
    Cookies.expire('authToken');
    Cookies.expire('userId');
    this.props.logoutUser();
    this.props.verifyLogin();
  }

  renderNavButtons() {
    if (!this.props.isLoggedIn) {
      return (
        <div>
          <Link to="/register"
            className="btn navbar-buttons navbar-register"
            onClick={this.handleClick.bind(this)}> Register</Link>
          <Link to="/login"
            className="btn navbar-buttons navbar-login"
            onClick={this.handleClick.bind(this)}> Login</Link>
        </div>
      );
    } else {
      return (
        <div>
          <Link to="/"
            className="btn navbar-buttons navbar-logout"
            onClick={this.logoutClick.bind(this)}>Logout</Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="col-xs-12 navbar">
        <div className="container">
          <div className="pull-left navbar-logo">
            <h3>
              <Link to="/" className="navbar-logo-button"> GFFL
                <span className="subtitle">Group Fantasy Football League</span>
              </Link>
            </h3>
          </div>
          <div className="pull-right navbar-buttons">
            {this.renderNavButtons()}
          </div>
          <div className="text-center navbar-title">
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.isLoggedIn;
}

export default connect(mapStateToProps, { verifyLogin })(Navbar);
