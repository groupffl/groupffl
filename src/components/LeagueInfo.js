import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLeagueInfo } from '../actions/index';

class LeagueInfo extends Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {
    this.props.fetchLeagueInfo(this.props.leagueId)
      .then((res) => {
        console.log('fetched league data in league', res);
      });

  }

  renderTeamList() {
    if (!this.props.leagueInfo.teams) {
      return (
        <div>No Teams</div>
      );
    }

    return this.props.leagueInfo.teams.map(team =>
    (
        <li>
          <div>
            <h5>{team.name}</h5>
          </div>
        </li>
      )
    );
  }


  render() {

    if (!this.props.leagueInfo) {
      return (
        <div>loading league data...</div>
      );
    }

    const { leagueInfo } = this.props;


    // TODO: populated commisioner and fantasy link url

    return (
      <div className="league-info">

        <h3>{leagueInfo.name}</h3>

        <div className="league-info-details">
          <h4>League ID</h4>
          <p>{leagueInfo._id}</p>
          <h4>FFL URL</h4>
          <a href="#">httpffl.com/league/9090909</a>
          <h4>Commissioner</h4>
          <p>Email: {leagueInfo.commissioner.email}</p>
          <h4>Related Links</h4>
          <a className="related-links" href="">ESPN Fantasy News</a>
          <a className="related-links" href="">Yahoo Fantasy News</a>
          <a className="related-links" href="">NFL Fantasy News</a>
          <a className="related-links" href="">Rotoworld Fantasy News</a>
        </div>

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
  return state.leagueInfo;
}

export default connect(mapStateToProps, { fetchLeagueInfo })(LeagueInfo);
