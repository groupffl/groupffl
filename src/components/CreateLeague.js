import React, { Component } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import { createLeague } from '../actions/index';
// import { Link, browserHistory } from 'react-router';

class CreateLeague extends Component {
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
      <div className="login-register-form">
        <h3>Be a league commissioner.</h3>
        <h4 className="login-title">Create a league.</h4>
        <div className="form-wrapper col-xs-6 col-xs-offset-3">
          <img src="http://i.imgur.com/addEGTI.png" width="13%" alt=""/>
          <form
            onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <div>
              {this.state.message}
            </div>
            <div>
              {this.state.success}
            </div>
            <div className={`form-group ${name.touched && name.invalid ? 'has-danger' : ''}`}>
              <input type="text" className="form-control" placeholder="Enter a league name"
              {...name} />
              <div className="text-help">
                {name.touched ? name.error : ''}
              </div>
            </div>
            <div className={`form-group ${fflUrl.touched && fflUrl.invalid ? 'has-danger' : ''}`}>
              <input type="text" className="form-control" placeholder="Enter the url from your fantasy site"
              {...fflUrl} />
              <div className="text-help">
                {fflUrl.touched ? fflUrl.error : ''}
              </div>
            </div>
            <div className={`form-group ${fflUrl.touched && team.invalid ? 'has-danger' : ''}`}>
              <input type="text" className="form-control" placeholder="Enter your team name"
              {...team} />
              <div className="text-help">
                {team.touched ? team.error : ''}
              </div>
            </div>
            <button type="submit" className="btn form-control form-btn">Create</button>
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
}, mapStateToProps, { createLeague })(CreateLeague);
