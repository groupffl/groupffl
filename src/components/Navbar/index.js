import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { verifyLogin, logoutUser } from '../../actions/UserActions';
import Cookies from 'cookies-js';
import styles from './index.scss';

class Navbar extends Component {
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
            className="btn"
            styleName="btn navbar-buttons navbar-register"
            onClick={this.handleClick.bind(this)}> Register</Link>
          <Link to="/login"
            className="btn"
            styleName="btn navbar-buttons navbar-login"
            onClick={this.handleClick.bind(this)}> Login</Link>
        </div>
      );
    } else {
      return (
        <div>
          <Link to="/"
            className="btn"
            styleName="btn navbar-buttons navbar-logout"
            onClick={this.logoutClick.bind(this)}>Logout</Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div
        className="col-xs-12 navbar"
        styleName="navbar">
        <div className="container">
          <div
            className="pull-left"
            styleName="navbar-logo">
            <h3>
              <Link to="/"> GFFL
                <span styleName="subtitle">Group Fantasy Football League</span>
              </Link>
            </h3>
          </div>
          <div
            className="pull-right"
            styleName="navbar-buttons">
            {this.renderNavButtons()}
          </div>
          <div
            className="text-center">
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.isLoggedIn;
}

export default connect(mapStateToProps, { verifyLogin, logoutUser })(CSSModules(Navbar, styles, {allowMultiple: true}));
