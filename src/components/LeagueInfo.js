import React, { Component } from 'react';
import { connect } from 'react-redux';

class LeagueInfo extends Component {

  renderTeamList() {
    if (!this.props.leagueData.teams) {
      return (
        <div>No Teams</div>
      );
    }

    return this.props.leagueData.teams.map(team => {
      return <li>{team.name}</li>
    });
  }


  render() {

    if (!this.props.leagueData) {
      return (
        <div>loading league data...</div>
      )
    }

    const { leagueData } = this.props;


    // TODO: populated commisioner and fantasy link url
    console.log(leagueData);
    return (
      <div className="league-info">
        <h3>{leagueData.name}</h3>
        <h4>League ID</h4>
        <p>{leagueData._id}</p>
        <h4>FFL URL</h4>
        <a href="#">httpffl.com/league/9090909</a>
        <h4>Commissioner</h4>
        <p>Email: {leagueData.commissioner.email}</p>
        <h4>Members</h4>
        <ul>
          {this.renderTeamList()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return state.leagueData;
}

export default connect(mapStateToProps)(LeagueInfo);
