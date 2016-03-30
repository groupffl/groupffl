import React, { Component } from 'react';
import { connect } from 'react-redux';

class LeagueInfo extends Component {
  render() {
    console.log(this.props.leagueData);
    return (
      <div className="col-xs-3 league-info">
        <h3>League Name</h3>
        <h4>League ID</h4>
        <p>aa;klfdjakldasdfadaf</p>
        <h4>FFL URL</h4>
        <a href="#">httpffl.com/league/9090909</a>
        <h4>Commissioner</h4>
        <p>Humpty dumpty</p>
        <h4>Members</h4>
        <ul>
          <li>Some Players</li>
          <li>Some Players</li>
          <li>Some Players</li>
          <li>Some Players</li>
          <li>Some Players</li>
          <li>Some Players</li>
          <li>Some Players</li>
          <li>Some Players</li>
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.leagueData;
}

export default connect(mapStateToProps)(LeagueInfo);
