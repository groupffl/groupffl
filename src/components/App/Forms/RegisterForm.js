import React, { Component } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import { registerUser, verifyLogin, beginSpinner, endSpinner } from '../../../actions/index';
import Spinner from '../Spinner';

class RegisterForm extends Component {
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

  onSubmit(props) {
    this.props.beginSpinner();
    this.props.registerUser(props)
      .then((response) => {
        this.props.endSpinner();
        this.props.verifyLogin();
        if (response.payload.data.verify){
          this.props.history.push('/');
        } else {
          this.setState({
            message: response.payload.data.message
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
      <button type="submit" className="btn form-btn form-control">Register</button>
    );
  }

  render() {
    const { fields: { email, password, password2 }, handleSubmit } = this.props;

    return (
      <div className="login-register-form">
        <h3>One account. All your leagues.</h3>
        <h4 className="login-title">Register with your email.</h4>
        <div className="form-wrapper col-xs-6 col-xs-offset-3">
          <img src="http://i.imgur.com/92Fh6AU.png" width="35%" alt=""/>
          <form
            onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <div className="form-verify-error">
              {this.state.message}
            </div>
            <div className={`form-group ${email.touched && email.invalid ? 'has-danger' : ''}`}>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your email"
                {...email} />
              <div className="text-help-register">
                {email.touched ? email.error : ''}
              </div>
            </div>
            <div className={`form-group ${password.touched && password.invalid ? 'has-danger' : ''}`}>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                {...password} />
              <div className="text-help-register">
                {password.touched ? password.error : ''}
              </div>
            </div>
            <div className={`form-group ${password2.touched && password2.invalid ? 'has-danger' : ''}`}>
              <input
                type="password"
                className="form-control form-reg-password-again"
                placeholder="Enter your password (again)"
                {...password2} />
              </div>
              <div className="text-help-password-again">
                {password2.touched ? password2.error : ''}
              </div>
            {this.renderButton()}
          </form>
        </div>
        <div className="col-xs-6 col-xs-offset-3">
          <Link to="/login" className="login-noaccount" href="#">I already have an account</Link>
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
  if (!values.password2) {
    errors.password2 = 'Enter a password';
  }

  if (values.password !== values.password2) {
    errors.password2 = 'Passwords Do Not Match';
  }
  return errors;
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.isLoggedIn.isLoggedIn,
    isLoading: state.isLoading
  };
}

export default reduxForm({
  form: 'RegisterForm',
  fields: ['email', 'password', 'password2'],
  validate
}, mapStateToProps, { registerUser, verifyLogin, beginSpinner, endSpinner } )(RegisterForm);
