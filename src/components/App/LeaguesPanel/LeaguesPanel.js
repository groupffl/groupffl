import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLeagues, fetchLeagueInfo } from '../../actions/index';
import { Link } from 'react-router';
import DemoVideo from './DemoVideo';

class LeaguesPanel extends Component {
  componentWillMount() {
    this.props.fetchLeagues()
      .then(() => {});
  }

  componentWillUpdate() {
    console.log(this.props.leagues);
    if (typeof this.props.leagues == 'string') {
      this.props.fetchLeagues()
        .then(() => {});
    }
  }

  handleClick(id) {
    this.props.fetchLeagueInfo(id)
      .then(() => {});
  }

  renderList() {
    if (!this.props.isLoggedIn) {
      return (
        <DemoVideo />
      );
    }
    if (this.props.leagues.length == 0) {
      return (
        <DemoVideo />
      );
    }

    if (typeof this.props.leagues == 'string') {
      return (
        <DemoVideo />
      );
    }

    return this.props.leagues.map(league =>
      <Link to={'league/' + league._id +'/posts'}
            onClick={this.handleClick.bind(this, league._id)}>
        <li key={league._id}>
          <div>
            <h4>{league.teamName}</h4>
            <h5>{league.leagueName}</h5>
          </div>
        </li>
      </Link>
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
