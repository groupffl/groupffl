import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLeagueMembers } from '../../../actions/index';

import MemberLink from './MemberLink';

class LeagueMembers extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchLeagueMembers(this.props.leagueId)
      .then(() => {
      });
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
        <h4 className="league-member-title">Members</h4>
        <div className="league-members-list">
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

export default connect(mapStateToProps, { fetchLeagueMembers })(LeagueMembers);
