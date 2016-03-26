import React, { Component } from 'react';

import Navbar from './Navbar';
import LeagueInfo from './LeagueInfo';
import MediaFeeds from './MediaFeeds';

export default class League extends Component {
  render() {
    return (
      <div className="container">
        <Navbar />
        <LeagueInfo />
        {this.props.children}
        <MediaFeeds />
      </div>
    )
  }
}
