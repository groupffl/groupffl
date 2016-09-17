import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchLeagueMembers } from '../../../actions/LeagueActions';
import styles from './index.scss';

class LeagueMembers extends Component {
  constructor(props) {
    super(props);
    this.props.fetchLeagueMembers(this.props.leagueId)
      .then(() => {});
  }

  renderTeamList() {
    if (!this.props.leagueMembers.teams) {
      return (
        <div>No Teams</div>
      );
    }

    return this.props.leagueMembers.teams.map(team =>
      (
        <Link
          to="/"
          styleName="league-info-list-tab"
          href="#">
          <li>{team.name}</li>
        </Link>
      )
    );
  }

  render() {
    return (
      <div>
        {this.renderTeamList()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.leagueMembers;
}

export default connect(mapStateToProps, { fetchLeagueMembers })(CSSModules(LeagueMembers, styles));