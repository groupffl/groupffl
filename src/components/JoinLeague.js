import React, { Component } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import { joinLeague, verifyLogin } from '../actions/index';
// import Cookies from 'cookies-js';
// import { Link, browserHistory } from 'react-router';

class JoinLeague extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      success: ''
    };
  }


  componentWillMount() {
    if (!this.props.isLoggedIn) {
      this.props.history.push('/login');
    }
  }

  onSubmit(props) {
    this.props.joinLeague(props)
      .then(() => {
        this.props.resetForm();
        this.setState({
          message: '',
          success: 'Joined league successfully.'
        });
      }, () => {
        this.setState({
          message: 'League ID invalid or team name already taken.',
          success: ''
        });
      });
  }

  render() {
    const { fields: { leagueId, team }, handleSubmit } = this.props;

    return (
      <div className="login-register-form">
        <h3>Join an existing league.</h3>
        <h4 className="login-title">Join with the league ID.</h4>
        <div className="form-wrapper col-xs-6 col-xs-offset-3">
          <img src=" http://i.imgur.com/gG4Gqys.png" width="35%" alt=""/>
          <form
            onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <div className="form-verify-error">
              {this.state.message}
            </div>
            <div className="form-verify-success">
              {this.state.success}
            </div>
            <div className={`form-group ${leagueId.touched && leagueId.invalid ? 'has-danger' : ''}`}>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the league ID"
                {...leagueId}
                />
                <div className="text-help">
                  {leagueId.touched ? leagueId.error : ''}
                </div>
            </div>
            <div className={`form-group ${team.touched && team.invalid ? 'has-danger' : ''}`}>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your team name"
                {...team}
                />
                <div className="text-help">
                  {team.touched ? team.error : ''}
                </div>
            </div>
            <button type="submit" className="btn form-control form-btn">Join</button>
          </form>
        </div>
        <div className="col-xs-6 col-xs-offset-3">
          <Link to="/create" className="login-noaccount" href="#">I want to create a league</Link>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.leagueId) {
    errors.leagueId = 'Enter a league ID';
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
  form: 'JoinLeague',
  fields: ['leagueId', 'team'],
  validate
}, mapStateToProps, { joinLeague, verifyLogin })(JoinLeague);
