import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Glyphicon } from 'react-bootstrap';
import { verifyLogin } from '../../../actions/UserActions';

class CreateLeagueButton extends Component {
  handleClick() {
    this.props.verifyLogin();
  }

  render() {
    return (
      <Link to="/create"
        className="create-button join-panel-buttons"
        onClick={this.handleClick.bind(this)}>
        <div className="join-icons-panel">
          <span><Glyphicon glyph="plus" /></span>
          <h3 className="bold">Create</h3>
          <h3>a league</h3>
        </div>
      </Link>
    );
  }
}

export default connect(null, { verifyLogin })(CreateLeagueButton);
