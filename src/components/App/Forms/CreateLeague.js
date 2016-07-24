import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import styles from './index.scss';
import {
  createLeague
} from '../../../actions/LeagueActions';

import {
  promptLogin
} from '../../../actions/UserActions';

class CreateLeague extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      success: ''
    };

    if (!this.props.isLoggedIn) {
      const REDIRECT_MESSAGE = 'Please login to create a league.';
      this.props.promptLogin(REDIRECT_MESSAGE);
      this.props.history.push('/login');
    }
  }

  onSubmit(props) {
    this.props.createLeague(props)
      .then( () => {
        this.props.resetForm();
        this.setState({
          message: '',
          success: 'League created successfully'
        });
      }, () => {
        this.setState({
          message: 'League name already taken.',
          success: ''
        });
      });
  }

  render() {
    const { fields: { name, fflUrl, team }, handleSubmit } = this.props;

    return (
      <div styleName="login-register-form">
        <h3>Be a league commissioner.</h3>
        <h4>Create a league.</h4>
        <div
          className="col-xs-6 col-xs-offset-3"
          styleName="form-wrapper">
          <img src="http://i.imgur.com/addEGTI.png" width="13%" alt=""/>
          <form
            onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <div styleName="form-verify-error">
              {this.state.message}
            </div>
            <div styleName="form-verify-success">
              {this.state.success}
            </div>
            <div className={`form-group ${name.touched && name.invalid ? 'has-danger' : ''}`}>
              <input type="text" className="form-control" placeholder="Enter a league name"
              {...name} />
              <div styleName="text-help">
                {name.touched ? name.error : ''}
              </div>
            </div>
            <div className={`form-group ${fflUrl.touched && fflUrl.invalid ? 'has-danger' : ''}`}>
              <input type="text" className="form-control" placeholder="Enter the url from your fantasy site"
              {...fflUrl} />
              <div styleName="text-help">
                {fflUrl.touched ? fflUrl.error : ''}
              </div>
            </div>
            <div className={`form-group ${fflUrl.touched && team.invalid ? 'has-danger' : ''}`}>
              <input type="text" className="form-control" placeholder="Enter your team name"
              {...team} />
              <div styleName="text-help">
                {team.touched ? team.error : ''}
              </div>
            </div>
            <button type="submit" className="btn form-control form-btn">Create</button>
          </form>
        </div>
        <div className="col-xs-6 col-xs-offset-3">
          <Link to="/join" styleName="login-noaccount" href="#">I want to join an existing league</Link>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.name) {
    errors.name = 'Enter a league name';
  }
  if (!values.fflUrl) {
    errors.fflUrl = 'Enter a league URL';
  }
  if (!values.team) {
    errors.team = 'Enter a team name';
  }

  return errors;
}

function mapStateToProps(state) {
  return state.isLoggedIn;
}

export default reduxForm({
  form: 'CreateLeague',
  fields: ['name', 'fflUrl', 'team'],
  validate
}, mapStateToProps, { createLeague, promptLogin })(CSSModules(CreateLeague, styles));
