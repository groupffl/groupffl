import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLeagues, fetchLeagueInfo } from '../../../actions/LeagueActions';
import LeagueLink from './LeagueLink';

class LeaguesPanel extends Component {
  componentWillMount() {
    this.props.fetchLeagues()
      .then(() => {});
  }

  handleClick(id) {
    this.props.fetchLeagueInfo(id)
      .then(() => {});
  }

  renderList() {
    const { isLoggedIn, leagues } = this.props;
    if (!isLoggedIn || !leagues || leagues.length == 0 || typeof leagues == 'string') {
      return (
        <div className="text-center">
          <br/>
          <h4>Join or Create a League</h4>
          <br/>
          <br/>
          <br/>
          <img src="http://i.imgur.com/jKqzOpv.png" width="100%" alt=""/>
        </div>
      );
    }
    return leagues.map(league =>
      <LeagueLink key={league._id} league={league} handleClick={this.handleClick.bind(this)}/>
    );
  }

  render() {
    return (
      <div>
        <h3 className="league-header">My Leagues</h3>
        <div className="league-panel">
          <ul>
            {this.renderList()}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    leagues: state.league.all,
    isLoggedIn: state.isLoggedIn.isLoggedIn
  };
}

export default connect(mapStateToProps, { fetchLeagues, fetchLeagueInfo })(LeaguesPanel);
