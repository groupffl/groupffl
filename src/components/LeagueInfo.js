import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLeagueInfo } from '../actions/index';

class LeagueInfo extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchLeagueInfo(this.props.leagueId)
      .then(() => {
      });
  }

  render() {
    if (!this.props.leagueInfo) {
      return (
        <div>loading league data...</div>
      );
    }

    const { leagueInfo } = this.props;

    return (
      <div>
        <h3>{leagueInfo.name}</h3>
        <div className="league-info-details">
          <h4>League ID</h4>
          <p>{leagueInfo._id}</p>
          <h4>FFL URL</h4>
          <a href="#">{leagueInfo.fflUrl}</a>
          <h4>Commissioner</h4>
          <p>Team Name:<br />{leagueInfo.commissionerTeamName}</p>
          <p>Email:<br />{leagueInfo.commissioner.email}</p>
          <h4>Related Links</h4>
          <a className="related-links" href="http://games.espn.go.com/frontpage/football">ESPN Fantasy News</a>
          <a className="related-links" href="http://football.fantasysports.yahoo.com/">Yahoo Fantasy News</a>
          <a className="related-links" href="http://www.nfl.com/fantasyfootball/playernews">NFL Fantasy News</a>
          <a className="related-links" href="http://www.rotoworld.com/playernews/nfl/football/">Rotoworld Fantasy News</a>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.leagueInfo;
}

export default connect(mapStateToProps, { fetchLeagueInfo })(LeagueInfo);
