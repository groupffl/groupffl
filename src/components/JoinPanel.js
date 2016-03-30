import React, { Component } from 'react';
import { verifyLogin } from '../actions/index';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Glyphicon } from 'react-bootstrap';

class JoinPanel extends Component {
  handleClick() {
    this.props.verifyLogin();
  }

  render() {
    return (
      <div className="join-panel">
        <Link to="/join"
          className="join-button join-panel-buttons"
          onClick={this.handleClick.bind(this)}>
          <div className="join-icons-panel">
            <span><Glyphicon glyph="arrow-right" /></span>
            <h3 className="bold">Join</h3>
            <h3>a league</h3>
          </div>
        </Link>
        <Link to="/create"
          className="create-button join-panel-buttons"
          onClick={this.handleClick.bind(this)}>
          <div className="join-icons-panel">
            <span><Glyphicon glyph="plus" /></span>
            <h3 className="bold">Create</h3>
            <h3>a league</h3>
          </div>
        </Link>
      </div>
    );
  }
}

export default connect(null, { verifyLogin })(JoinPanel);
