import React, { Component } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import Spinner from './Spinner';

import {
  loginUser,
  verifyLogin,
  promptLogin
} from '../../../actions/UserActions';

import {
  beginSpinner,
  endSpinner
} from '../../../actions/SpinnerActions';

import { fetchLeagues } from '../../../actions/LeagueActions';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }

  componentWillMount() {
    if (this.props.isLoggedIn) {
      this.props.history.push('/');
    }
  }

  componentWillUnmount() {
    const REDIRECT_MESSAGE = null;
    this.props.promptLogin(REDIRECT_MESSAGE);
  }

  onSubmit(props) {
    this.props.beginSpinner();
    this.props.loginUser(props)
      .then(response => {
        this.props.endSpinner();
        this.props.verifyLogin();
        if (response.payload.data.verify) {
          this.props.history.push('/');
          this.props.fetchLeagues()
            .then(() => {});
        } else {
          const REDIRECT_MESSAGE = null;
          const INCORRECT_EMAIL_PASS = 'Incorrect email or password';
          this.props.promptLogin(REDIRECT_MESSAGE);
          this.setState({
            message: INCORRECT_EMAIL_PASS
          });
        }
      });
  }

  renderButton() {
    if (this.props.isLoading) {
      return (
        <button type="submit" className="btn form-btn form-control">
          <Spinner />
        </button>
      );
    }
    return (
      <button type="submit" className="btn form-btn form-control">Sign in</button>
    );
  }

  render() {
    const { fields: { email, password }, handleSubmit } = this.props;
    return (
      <div className="login-register-form">
        <h3>One account. All your leagues.</h3>
        <h4 className="login-title">Sign in with your email</h4>
        <div className="form-wrapper col-xs-6 col-xs-offset-3">
          <img src=" http://i.imgur.com/FwW4B2K.png" width="35%" alt=""/>
          <form
            onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <div className="form-verify-error">
              {this.props.loginPrompt}
              {this.state.message}
            </div>
            <div className={`form-group ${email.touched && email.invalid ? 'has-danger' : ''}`}>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                {...email} />
            </div>
            <div className="text-help-login">
              {email.touched ? email.error : ''}
            </div>
            <div className={`form-group ${email.touched && email.invalid ? 'has-danger' : ''}`}>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                {...password} />
            </div>
            <div className="text-help-login">
              {password.touched ? password.error : ''}
            </div>
            {this.renderButton()}
            <a className="pull-right" href="#">Forgot password?</a>
          </form>
        </div>
        <div className="col-xs-6 col-xs-offset-3">
          <Link to="/register" className="login-noaccount" href="#">I do not have an account</Link>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = 'Enter an email';
  }

  if (!values.password) {
    errors.password = 'Enter a password';
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.isLoggedIn.isLoggedIn,
    isLoading: state.isLoading,
    loginPrompt: state.promptLogin
  };
}

export default reduxForm({
  form: 'LoginForm',
  fields: ['email', 'password'],
  validate
}, mapStateToProps, {
  loginUser,
  verifyLogin,
  beginSpinner,
  endSpinner,
  promptLogin,
  fetchLeagues
})(LoginForm);
