import React, { Component } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import { createLeague } from '../actions/index';
// import { Link, browserHistory } from 'react-router';

class CreateLeague extends Component {
  componentWillMount() {
    console.log('before create league', this.props.isLoggedIn);
    if (!this.props.isLoggedIn) {
      this.props.history.push('/login');
    }
  }

  onSubmit(props) {
    this.props.createLeague(props)
      .then(() => true/* this.props.fetchLeagues(); */);
  }
  render() {
    const { fields: { name, leagueURL, team }, handleSubmit } = this.props;

    return (
      <div className="login-register-form">
        <h3>Be a league commisioner.</h3>
        <h4 className="login-title">Create a league.</h4>
        <div className="form-wrapper col-xs-6 col-xs-offset-3">
          <img src="../images/ajax_get_colored_svg2.png" width="35%" alt=""/>
          <form
            onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <div className={`form-group ${name.touched && name.invalid ? 'has-danger' : ''}`}>
              <input type="text" className="form-control" placeholder="Enter a league name"
              {...name} />
              <div className="text-help">
                {name.touched ? name.error : ''}
              </div>
            </div>
            <div className={`form-group ${leagueURL.touched && leagueURL.invalid ? 'has-danger' : ''}`}>
              <input type="text" className="form-control" placeholder="Enter the url from your fantasy site"
              {...leagueURL} />
              <div className="text-help">
                {leagueURL.touched ? leagueURL.error : ''}
              </div>
            </div>
            <div className={`form-group ${leagueURL.touched && team.invalid ? 'has-danger' : ''}`}>
              <input type="text" className="form-control" placeholder="Enter your team name"
              {...team} />
              <div className="text-help">
                {team.touched ? team.error : ''}
              </div>
            </div>
            <button type="submit" className="btn btn-success form-control">Create</button>
          </form>
        </div>
        <div className="col-xs-6 col-xs-offset-3">
          <Link to="/join" className="login-noaccount" href="#">I want to join an existing league</Link>
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
  if (!values.leagueURL) {
    errors.leagueURL = 'Enter a league URL';
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
  fields: ['name', 'leagueURL', 'team'],
  validate
}, mapStateToProps, { createLeague })(CreateLeague);
