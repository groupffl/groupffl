import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLeagues, fetchLeagueData } from '../actions/index';
import { Link } from 'react-router';

class LeaguesPanel extends Component {
  componentWillMount() {
    this.props.fetchLeagues()
      .then(res => {
        console.log('fetched Leagues', res);
      });
  }

  componentWillUpdate() {
    if (typeof this.props.leagues == 'string') {
      this.props.fetchLeagues()
        .then(() => {
          console.log('fetched Leagues');
        });
    }
  }

  handleClick(id) {
    this.props.fetchLeagueData(id)
      .then(() => {
        console.log('fetched league data');
      });
  }

  renderList() {

    console.log('login is: ', this.props.isLoggedIn);
    console.log('leagues is: ', this.props.leagues);

    if (!this.props.isLoggedIn) {
      return (
        <div> Please log in </div>
      );
    }

    if (!this.props.leagues) {
      return (
        <div>No Leagues</div>
      );
    }

    if (typeof this.props.leagues == 'string') {
      return (
        <div>Please Log In</div>
      );
    }

    return this.props.leagues.map(league =>
      <Link to={'league/' + league._id}
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

export default connect(mapStateToProps, { fetchLeagues, fetchLeagueData })(LeaguesPanel);
