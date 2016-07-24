import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Glyphicon } from 'react-bootstrap';
import { verifyLogin } from '../../../actions/UserActions';
import styles from './index.scss';

class CreateLeagueButton extends Component {
  handleClick() {
    this.props.verifyLogin();
  }

  render() {
    return (
      <Link to="/create"
        styleName="join-panel-buttons"
        onClick={this.handleClick.bind(this)}>
        <div styleName="join-icons-panel">
          <span><Glyphicon
            glyph="plus"
            styleName="glyphicon" /></span>
          <h3 styleName="bold">Create</h3>
          <h3>a league</h3>
        </div>
      </Link>
    );
  }
}

export default connect(null, { verifyLogin })(CSSModules(CreateLeagueButton, styles, {allowMultiple: true}));
