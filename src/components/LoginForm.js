import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { loginUser, verifyLogin } from '../actions/index';
// import { Link, browserHistory } from 'react-router';



class LoginForm extends Component {

  componentWillMount() {
    if (this.props.isLoggedIn) {
      this.props.history.push('/');
    }
  }

  onSubmit(props) {
    console.log('props: ', props);
    this.props.loginUser(props)
      .then(() => {
        this.props.verifyLogin();
        this.props.history.push('/');
        console.log('login successful');
      });
  }

  render() {
    const { fields: { email, password }, handleSubmit } = this.props;

    return (

      <div className="login-form">
        <h2 className="login-title">Sign in</h2>
        <div className="form-wrapper col-xs-6 col-xs-offset-3">
          <img src="http://ncaa-football-teams.pointafter.com/ajax_get_colored_svg?app_id=7406&filename=_6623298.svg&color=e9e9e9" width="40%" alt=""/>
          <form
            onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <div className={`form-group ${email.touched && email.invalid ? 'has-danger' : ''}`}>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                {...email} />
            </div>
            <div className="text-help">
              {email.touched ? email.error : ''}
            </div>
            <div className={`form-group ${email.touched && email.invalid ? 'has-danger' : ''}`}>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                {...password} />
            </div>
            <div className="text-help">
              {password.touched ? password.error : ''}
            </div>
            <button type="submit" className="btn btn-success form-control">Sign in</button>
          </form>
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
  return state.isLoggedIn;
}

export default reduxForm({
  form: 'LoginForm',
  fields: ['email', 'password'],
  validate
}, mapStateToProps, { loginUser, verifyLogin })(LoginForm);
