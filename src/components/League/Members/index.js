import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { fetchLeagueMembers } from '../../../actions/LeagueActions';
import styles from './index.scss';

import MemberLink from './MemberLink';

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
        <MemberLink team={team} />
      )
    );
  }

  render() {
    return (
      <div>
        <h4 styleName="league-member-title">Members</h4>
        <div styleName="league-members-list">
          <ul>
            {this.renderTeamList()}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.leagueMembers;
}

export default connect(mapStateToProps, { fetchLeagueMembers })(CSSModules(LeagueMembers, styles));
