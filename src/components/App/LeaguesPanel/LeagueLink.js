import React, { Component } from 'react';
import { Link } from 'react-router';

export default class LeagueLink extends Component {
  render() {
    return (
      <Link to={'league/' + this.props.league._id +'/posts'}
            onClick={this.props.handleClick.bind(this, this.props.league._id)}>
        <li key={this.props.league._id}>
          <div>
            <h4>{this.props.league.teamName}</h4>
            <h5>{this.props.league.leagueName}</h5>
          </div>
        </li>
      </Link>
    );
  }
}
