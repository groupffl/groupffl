import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { joinLeague, verifyLogin } from '../actions/index';
import Cookies from 'cookies-js';

class JoinLeague extends Component {
  componentWillMount() {
    // action to check for cookies.
    this.props.verifyLogin();
    // let res1 = Cookies.get('authToken');
    // console.log('cookie', res1);
  }


  onSubmit(props) {
    console.log('on submit', props);
    this.props.joinLeague(props)
      .then((res) => {
        console.log('res is: ', res);

      });
  }
  render() {
    const { fields: {leagueId, team }, handleSubmit } = this.props;

    return (
      <div className="col-xs-6 join-league-form">
        <h2 className="login-title">Join League</h2>

        <form
          onSubmit={handleSubmit(this.onSubmit.bind(this))}
          className="col-xs-10 col-xs-offset-1">
          <div className={`form-group ${leagueId.touched && leagueId.invalid ? 'has-danger' : ''}`}>
            <label>League Id</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter League Id"
              {...leagueId}
              />
              <div className="text-help">
                {leagueId.touched ? leagueId.error : ''}
              </div>
          </div>
          <div className={`form-group ${team.touched && team.invalid ? 'has-danger' : ''}`}>
            <label>Team Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Team Name"
              {...team}
              />
              <div className="text-help">
                {team.touched ? team.error : ''}
              </div>
          </div>
          <button type="submit" className="btn btn-default">Join</button>
        </form>

      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if(!values.leagueId) {
    errors.leagueId = 'Enter a league ID';
  }

  if(!values.team) {
    errors.team = 'Enter a team name';
  }
  return errors;
}

export default reduxForm ({
  form: 'JoinLeague',
  fields: ['leagueId', 'team'],
  validate
}, null, { joinLeague, verifyLogin })(JoinLeague);
