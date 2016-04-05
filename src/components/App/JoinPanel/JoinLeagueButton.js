import React, { Component } from 'react';
import { verifyLogin } from '../../../actions/UserActions';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Glyphicon } from 'react-bootstrap';

class JoinLeagueButton extends Component {
  handleClick() {
    this.props.verifyLogin();
  }

  render() {
    return (
      <Link to="/join"
        className="join-button join-panel-buttons"
        onClick={this.handleClick.bind(this)}>
        <div className="join-icons-panel">
          <span><Glyphicon glyph="arrow-right" /></span>
          <h3 className="bold">Join</h3>
          <h3>a league</h3>
        </div>
      </Link>
    );
  }
}

export default connect(null, { verifyLogin })(JoinLeagueButton);
