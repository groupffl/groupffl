import React, { Component } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import { registerUser } from '../actions/index';
// import { Link, browserHistory } from 'react-router'; // Only for Cancel

class RegisterForm extends Component {

  componentWillMount() {
    if (this.props.isLoggedIn) {

      this.props.history.push('/');
    }
  }

  onSubmit(props) {
    console.log(props);
    this.props.registerUser(props)
      .then(() => {
        this.props.history.push('/login');
        console.log('resolved');
      });
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
            <div className={`form-group ${email.touched && email.invalid ? 'has-danger' : ''}`}>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your email"
                {...email} />
              <div className="text-help">
                {email.touched ? email.error : ''}
              </div>
            </div>
            <div className={`form-group ${password.touched && password.invalid ? 'has-danger' : ''}`}>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                {...password} />
              <div className="text-help">
                {password.touched ? password.error : ''}
              </div>
            </div>
            <div className={`form-group ${password2.touched && password2.invalid ? 'has-danger' : ''}`}>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password (again)"
                {...password2} />
              </div>
              <div className="text-help">
                {password2.touched ? password2.error : ''}
              </div>
            <button type="submit" className="btn register-form-btn form-control">Register</button>
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
  return state.isLoggedIn;
}

export default reduxForm({
  form: 'RegisterForm',
  fields: ['email', 'password', 'password2'],
  validate
}, mapStateToProps, { registerUser } )(RegisterForm);
